import { type APIGatewayInfo, type GatewayReceivePayload, RouteBases } from 'discord-api-types/v10';
import WebSocket from 'ws';

import ChannelManager from '../managers/ChannelManager';
import GuildManager from '../managers/GuildManager';
import UserManager from '../managers/UserManager';

import { type ActivityType, ActivityTypes } from './Activity';
import Emitter from './Emitter';
import GatewayEvent from './GatewayEvent';
import PartialApplication from './PartialApplication';
import { type PresenceStatus, PresenceStatuses } from './Presence';
import User from './User';

import Intents, { type IntentsResolvable } from '../util/Intents';

export type ClientOptions = {
    intents: IntentsResolvable;
    mentions?: boolean;
};
export type ClientRequestOptions = {
    method: 'delete' | 'get' | 'patch' | 'post' | 'put';
    path: string;
    body?: object;
    reason?: string;
};
export type ClientPresenceOptions = {
    activities?: {
        name: string;
        state?: string;
        type?: ActivityType;
        url?: string;
    }[];
    afk?: boolean;
    status?: Exclude<PresenceStatus, 'Offline'>;
};

export default class Client extends Emitter {
    private requestQueue: (ClientRequestOptions & {
        resolve: (value: any) => void;
        reject: (error: Error) => void;
    })[] = [];
    private isProcessingQueue = false;
    private retryAfter = 0;

    public intents: Intents;
    public mentions: boolean;
    public presence: {
        activities: {
            name: string;
            state?: string;
            type: ActivityType;
            url?: string;
        }[];
        afk: boolean;
        status: Exclude<PresenceStatus, 'offline'>;
    };
    public ready!: {
        at: Date;
        timestamp: number;
    };
    public token!: string;
    public user!: User;
    public webSocket!: WebSocket;

    public application = new PartialApplication(this);
    public channels = new ChannelManager(this);
    public guilds = new GuildManager(this);
    public users = new UserManager(this);

    public constructor(options: ClientOptions) {
        super();

        this.intents = new Intents(options.intents);
        this.mentions = !!options.mentions;
        this.presence = {
            activities: [],
            afk: false,
            status: 'Online'
        };

        Object.defineProperties(this, {
            requestQueue: { enumerable: false },
            isProcessingQueue: { enumerable: false },
            retryAfter: { enumerable: false },
            token: { enumerable: false },
            webSocket: { enumerable: false },
            application: { enumerable: false },
            channels: { enumerable: false },
            guilds: { enumerable: false },
            users: { enumerable: false }
        });
    }

    private async processQueue(): Promise<void> {
        if (this.isProcessingQueue) {
            return;
        }

        this.isProcessingQueue = true;

        while (this.requestQueue.length > 0) {
            const now = Date.now();

            if (this.retryAfter > now) {
                await new Promise((resolve) => {
                    setTimeout(resolve, this.retryAfter - now);
                });
            }

            const options = this.requestQueue.shift();

            if (!options) {
                return;
            }

            try {
                options.resolve(await this.processRequest(options));
            } catch (error: any) {
                if (error.status === 429) {
                    this.retryAfter = Date.now() + error.headers['retry-after'] * 1000;
                    this.requestQueue.unshift(options);
                } else {
                    options.reject(error);
                }
            }
        }

        this.isProcessingQueue = false;
    }
    private async processRequest(options: ClientRequestOptions): Promise<any> {
        const headers: Record<string, string> = {
            Authorization: `Bot ${this.token}`,
            'Content-Type': 'application/json'
        };

        if (options.reason) {
            headers['X-Audit-Log-Reason'] = options.reason;
        }

        const response = await fetch(`${RouteBases.api}${options.path}`, {
            method: options.method,
            headers: headers,
            body: JSON.stringify(options.body) ?? undefined
        });

        if (!response.ok) {
            const error = new Error(`HTTP Error. Status: ${response.status}`);

            (error as any).status = response.status;
            (error as any).headers = response.headers;

            throw error;
        }

        return await response.json();
    }

    public async login(token: string): Promise<void> {
        this.token = token;

        try {
            const data: APIGatewayInfo = await this.request({
                method: 'get',
                path: '/gateway/bot'
            });

            this.webSocket = new WebSocket(data.url);

            this.webSocket.on('open', () => {
                this.webSocket.send(JSON.stringify({
                    op: 2,
                    d: {
                        intents: this.intents.bitField,
                        token: this.token,
                        properties: {
                            os: 'windows',
                            browser: 'chrome',
                            device: 'chrome'
                        }
                    }
                }));
            });
            this.webSocket.on('message', async (data) => {
                const payload: GatewayReceivePayload = JSON.parse(data.toString());

                if (payload.op === 10) {
                    setInterval(() => {
                        this.webSocket.send(JSON.stringify({
                            op: 1,
                            d: null
                        }));
                    }, payload.d.heartbeat_interval);
                }
                if (!payload.t) {
                    return;
                }

                const event: GatewayEvent = require(`../events/${payload.t}`).default;

                if (event.name != payload.t) {
                    return;
                }

                event.run(this, payload.d);
            });
            this.webSocket.on('error', (error) => {
                throw new Error(`WebSocket error: ${error.message}`);
            });
        } catch (error: any) {
            throw new Error(`Failed to login: ${error.message}`);
        }
    }
    public async request(options: ClientRequestOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({ ...options, resolve, reject });
            this.processQueue();
        });
    }
    public async setPresence(options: ClientPresenceOptions): Promise<void> {
        this.presence = {
            activities: options.activities?.map((activity) => ({
                ...activity,
                type: activity.type || 'Playing'
            })) || [],
            afk: !!options.afk,
            status: options.status || 'Online'
        };

        this.webSocket.send(JSON.stringify({
            op: 3,
            d: {
                activities: this.presence.activities.map((activity) => ({
                    ...activity,
                    type: ActivityTypes[activity.type] as number
                })),
                afk: this.presence.afk,
                since: Date.now(),
                status: PresenceStatuses[this.presence.status] as string
            }
        }));
    }
}