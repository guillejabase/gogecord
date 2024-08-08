import https from 'https';
import EventEmitter from 'events';
import WebSocket from 'ws';

import Event, { Events } from './Event';
import Guild from './Guild';
import Listener, { ListenersNames } from './Listener';
import User from './User';

import UserManager from '../managers/UserManager';

import Collection from '../util/Collection';
import Intents, { IntentsResolvable } from '../util/Intents';

type RequestMethod = 'delete' | 'get' | 'patch' | 'post' | 'put';
type RequestOptions = {
    method: RequestMethod;
    path: string;
    body?: any;
    reason?: string;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
};

export default class Client extends EventEmitter {
    private intents: Intents;
    private token: string;
    private webSocket!: WebSocket;

    private queue: RequestOptions[] = [];
    private reset: number = 0;
    private processing: boolean = false;

    public events: Collection<keyof Events, Event>;
    public owner!: User;
    public ready!: {
        at: Date;
        timestamp: number;
    };
    public user!: User;

    public guilds = new Collection<string, Guild>();
    public users = new UserManager(this);

    constructor (options: {
        intents: IntentsResolvable;
        token: string;
        events: Client['events'];
    }) {
        super();

        this.events = options.events;
        this.intents = new Intents(options.intents);
        this.token = options.token;

        this.request('get', '/gateway/bot').then((response) => {
            this.webSocket = new WebSocket(`${response.url}/?v=10&encoding=json`);

            this.webSocket.on('open', () => {
                this.webSocket.send(JSON.stringify({
                    op: 2,
                    d: {
                        token: this.token,
                        intents: this.intents.bitField,
                        properties: {
                            os: 'windows',
                            browser: 'chrome',
                            device: 'chrome'
                        }
                    }
                }));
            });
            this.webSocket.on('message', (buffer) => {
                const data: {
                    op: number,
                    d: any,
                    t: keyof typeof ListenersNames;
                } = JSON.parse(buffer.toString());

                if (data.op == 10) {
                    setInterval(() => {
                        return this.webSocket.send(JSON.stringify({
                            op: 1,
                            d: null
                        }));
                    }, data.d.heartbeat_interval);
                }
                if (!data.t) {
                    return;
                }

                const name = ListenersNames[data.t];

                import(`../listeners/${name}`).then((file) => {
                    return file.default;
                }).then((listener: Listener) => {
                    return listener.run(this, data.d);
                }).catch(() => { });

                const event = this.events.get(name as keyof Events);

                if (!event || this.listeners(event.name).length) {
                    return;
                }

                this.on(event.name, (client, ...args) => {
                    return event.run(client, ...args);
                });
            });
        });
        this.request('get', '/oauth2/applications/@me').then((response) => {
            this.owner = new User(response.owner);
        });

        Object.defineProperties(this, {
            _events: { enumerable: false },
            _eventsCount: { enumerable: false },
            _maxListeners: { enumerable: false },
            events: { enumerable: false },
            guilds: { enumerable: false },
            intents: { enumerable: false },
            processing: { enumerable: false },
            queue: { enumerable: false },
            reset: { enumerable: false },
            token: { enumerable: false },
            unavailableGuilds: { enumerable: false },
            users: { enumerable: false },
            webSocket: { enumerable: false }
        });
    }

    private async process(): Promise<void> {
        if (this.processing) {
            return;
        }

        this.processing = true;

        const processQueue = async () => {
            while (this.queue.length > 0) {
                if (Date.now() < this.reset) {
                    await new Promise((resolve) => {
                        return setTimeout(resolve, this.reset - Date.now());
                    });
                }

                const requestOptions = this.queue.shift();

                if (!requestOptions) {
                    continue;
                }

                const { method, path, body, reason, resolve, reject } = requestOptions;

                const headers: Record<string, string> = {
                    Authorization: `Bot ${this.token}`,
                    'Content-Type': 'application/json'
                };

                if (reason) {
                    headers['X-Audit-Log-Reason'] = reason;
                }

                const request = https.request(`https://discord.com/api/v10${path}`, {
                    method,
                    headers
                }, (response) => {
                    let data = '';

                    response.on('data', (chunk) => {
                        data += chunk;
                    });
                    response.on('end', () => {
                        const parsed = JSON.parse(data);

                        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                            resolve(parsed);
                        } else if (response.statusCode && response.statusCode == 429) {
                            const retry = Number(response.headers['retry-after']) * 1000;

                            this.reset = Date.now() + retry;

                            this.queue.unshift(requestOptions);
                        } else {
                            reject(parsed);
                        }

                        setImmediate(processQueue);
                    });
                });

                if (body) {
                    request.write(JSON.stringify(body));
                }

                request.end();
                break;
            }

            if (this.queue.length > 0) {
                setImmediate(processQueue);
            } else {
                this.processing = false;
            }
        };

        setImmediate(processQueue);
    }

    public get ping(): Promise<number> {
        return new Promise((resolve: (value: number) => void) => {
            this.webSocket.ping(Date.now());
            this.webSocket.on('pong', (ms) => resolve(Date.now() - Number(ms)));
        });
    }

    public emit<key extends keyof Events>(name: key, client: this, ...args: Events[key]): boolean {
        return super.emit(name, client, ...args);
    }
    public listeners<key extends keyof Events>(name: key): Function[] {
        return super.listeners(name);
    }
    public on<key extends keyof Events>(name: key, listener: (client: this, ...args: Events[key]) => void): this {
        return super.on(name, listener);
    }
    public randomNumber(minimum: number, maximum: number, decimal?: boolean) {
        return decimal ? Math.random() * (maximum - minimum) + minimum : Math.floor(Math.random() * (maximum - minimum)) + minimum;
    }
    public request(method: RequestMethod, path: string, body?: any, reason?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.queue.push({ method, path, body, reason, resolve, reject });
            this.process();
        });
    }
    public toCase(text: string) {
        return `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;
    }
}