import EventEmitter from 'events';
import { AxiosInstance } from 'axios';
import WebSocket from 'ws';
import Embed from '../util/Embed';
import Intents, { IntentsResolvable } from '../util/Intents';
import User from './User';
import Collection from '../util/Collection';
import Guild from './Guild';
import { ClientEvents } from './Event';
type Presence = {
    activities: {
        name: string;
        type: 'Playing' | 'Listening' | 'Watching' | 'Custom';
    }[];
    status: 'Online' | 'DoNotDisturb' | 'Idle' | 'Offline';
};
export default class Client extends EventEmitter {
    api: AxiosInstance;
    embed: Embed;
    intents: Intents;
    owner: User;
    presence: Presence;
    token: string;
    user: User;
    webSocket: WebSocket;
    guilds: Collection<string, Guild>;
    users: Collection<string, User>;
    constructor(options: {
        intents: IntentsResolvable;
        token: string;
        presence?: Partial<Presence>;
    });
    get ping(): Promise<number>;
    emit<key extends keyof ClientEvents>(name: key, ...args: ClientEvents[key]): boolean;
    off<key extends keyof ClientEvents>(name: key, listener: (...args: ClientEvents[key]) => void): this;
    on<key extends keyof ClientEvents>(name: key, listener: (...args: ClientEvents[key]) => void): this;
}
export {};
