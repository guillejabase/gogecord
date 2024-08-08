import EventEmitter from 'events';
import Event, { Events } from './Event';
import Guild from './Guild';
import User from './User';
import UserManager from '../managers/UserManager';
import Collection from '../util/Collection';
import { IntentsResolvable } from '../util/Intents';
type RequestMethod = 'delete' | 'get' | 'patch' | 'post' | 'put';
export default class Client extends EventEmitter {
    private intents;
    private token;
    private webSocket;
    private queue;
    private reset;
    private processing;
    events: Collection<keyof Events, Event>;
    owner: User;
    ready: {
        at: Date;
        timestamp: number;
    };
    user: User;
    guilds: Collection<string, Guild>;
    users: UserManager;
    constructor(options: {
        intents: IntentsResolvable;
        token: string;
        events: Client['events'];
    });
    private process;
    get ping(): Promise<number>;
    emit<key extends keyof Events>(name: key, client: this, ...args: Events[key]): boolean;
    listeners<key extends keyof Events>(name: key): Function[];
    on<key extends keyof Events>(name: key, listener: (client: this, ...args: Events[key]) => void): this;
    randomNumber(minimum: number, maximum: number, decimal?: boolean): number;
    request(method: RequestMethod, path: string, body?: any, reason?: string): Promise<any>;
    toCase(text: string): string;
}
export {};
