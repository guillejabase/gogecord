import WebSocket from 'ws';
import ChannelManager from '../managers/ChannelManager';
import GuildManager from '../managers/GuildManager';
import UserManager from '../managers/UserManager';
import Emitter from './Emitter';
import { type PresenceActivityType, type PresenceStatus } from './Presence';
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
export default class Client extends Emitter {
    private requestQueue;
    private isProcessingQueue;
    private retryAfter;
    intents: Intents;
    mentions: boolean;
    presence: {
        activities: {
            name: string;
            state?: string;
            type: PresenceActivityType;
            url?: string;
        }[];
        afk: boolean;
        status: Exclude<PresenceStatus, 'offline'>;
    };
    ready: {
        at: Date;
        timestamp: number;
    };
    token: string;
    user: User;
    webSocket: WebSocket;
    channels: ChannelManager;
    guilds: GuildManager;
    users: UserManager;
    constructor(options: ClientOptions);
    private processQueue;
    private processRequest;
    login(token: string): Promise<void>;
    request(options: ClientRequestOptions): Promise<any>;
    setPresence(options: {
        activities?: {
            name: string;
            state?: string;
            type?: PresenceActivityType;
            url?: string;
        }[];
        afk?: boolean;
        status?: Exclude<PresenceStatus, 'Offline'>;
    }): Promise<void>;
}
//# sourceMappingURL=Client.d.ts.map