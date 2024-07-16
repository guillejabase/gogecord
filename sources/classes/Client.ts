import EventEmitter from 'events';
import axios, { AxiosInstance } from 'axios';
import WebSocket from 'ws';
import Embed from '../util/Embed';
import Intents, { IntentsResolvable } from '../util/Intents';
import User from './User';
import Collection from '../util/Collection';
import Guild from './Guild';
import Event, { ClientEvents, EventsIntents, EventsName, GatewayEvents } from './Event';

type Presence = {
    activities: {
        name: string;
        type: 'Playing' | 'Listening' | 'Watching' | 'Custom';
    }[];
    status: 'Online' | 'DoNotDisturb' | 'Idle' | 'Offline';
};

export default class Client extends EventEmitter {
    api: AxiosInstance;
    embed!: Embed;
    intents: Intents;
    owner!: User;
    presence: Presence;
    token: string;
    user!: User;
    webSocket!: WebSocket;
    guilds = new Collection<string, Guild>();
    users = new Collection<string, User>();

    constructor (options: {
        intents: IntentsResolvable;
        token: string;
        presence?: Partial<Presence>;
    }) {
        super();

        this.intents = new Intents(options.intents);
        this.presence = {
            activities: options.presence?.activities || [],
            status: options.presence?.status || 'Online'
        };
        this.token = options.token;
        this.api = axios.create({
            baseURL: 'https://discord.com/api/v10',
            headers: {
                Authorization: `Bot ${this.token}`
            }
        });

        this.api.get('/gateway/bot').then((response) => {
            this.webSocket = new WebSocket(`${response.data.url}/?v=10&encoding=json`)!;

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
                    t: keyof typeof EventsName;
                } = JSON.parse(buffer.toString());

                if (data.op == 10) {
                    setInterval(() => {
                        this.webSocket.send(JSON.stringify({
                            op: 1,
                            d: null
                        }));
                    }, data.d.heartbeat_interval);
                }

                import(`../events/${EventsName[data.t]}`)
                    .then((module) => module.default)
                    .then((event: Event<keyof GatewayEvents>) => event.run(this, data.d))
                    .catch(() => { });
            });
            this.webSocket.on('error', (error) => {
                throw console.error('An error ocurred:', error);
            });
        });
    }

    get ping() {
        return new Promise((resolve: (value: number) => void) => {
            this.webSocket.ping(Date.now());
            this.webSocket.once('pong', (data) => resolve(Date.now() - Number(data)));
        });
    }

    emit<key extends keyof ClientEvents>(name: key, ...args: ClientEvents[key]) {
        return super.emit(name, ...args);
    }

    off<key extends keyof ClientEvents>(name: key, listener: (...args: ClientEvents[key]) => void) {
        return super.off(name, listener);
    }

    on<key extends keyof ClientEvents>(name: key, listener: (...args: ClientEvents[key]) => void) {
        const intents = EventsIntents[name];

        if (intents.length && !intents?.some((intent) => this.intents.has(intent))) {
            console.warn(`Warning: "${name}" event requires "${intents.join('" & "')}" intent${intents.length > 1 ? 's' : ''}.`);
        }

        return super.on(name, listener);
    }
}