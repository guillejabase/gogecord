import WebSocket from 'ws';
import ChannelManager from '../managers/ChannelManager';
import GuildManager from '../managers/GuildManager';
import UserManager from '../managers/UserManager';
import { type ActivityType } from './Activity';
import Emitter from './Emitter';
import PartialApplication from './PartialApplication';
import { type PresenceStatus } from './Presence';
import User from './User';
import Intents, { type IntentsResolvable } from '../util/Intents';
export type ClientOptions = {
    intents: IntentsResolvable;
    mentions?: boolean;
};
export type ClientRequestOptions = {
    method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
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
    private requestQueue;
    private isProcessingQueue;
    private retryAfter;
    intents: Intents;
    mentions: boolean;
    presence: {
        activities: {
            name: string;
            state?: string;
            type: ActivityType;
            url?: string;
        }[];
        afk: boolean;
        status: Exclude<PresenceStatus, 'Offline'>;
    };
    ready: {
        at: Date;
        timestamp: number;
    };
    token: string;
    user: User;
    webSocket: WebSocket;
    application: PartialApplication;
    channels: ChannelManager;
    guilds: GuildManager;
    users: UserManager;
    constructor(options: ClientOptions);
    private processQueue;
    private processRequest;
    login(token: string): Promise<void>;
    request(options: ClientRequestOptions): Promise<any>;
    setPresence(options: ClientPresenceOptions): Promise<void>;
}
//# sourceMappingURL=Client.d.ts.map