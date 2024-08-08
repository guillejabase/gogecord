import Ban from '../classes/Ban';
import Client from '../classes/Client';
import Guild from '../classes/Guild';
import User from '../classes/User';
import Collection from '../util/Collection';
export default class BanManager {
    private client;
    private guild;
    cache: Collection<string, Ban>;
    constructor(client: Client, guild: Guild);
    private path;
    add(user: User, reason?: string, days?: number): Promise<Ban>;
    remove(user: User, reason?: string): Promise<void>;
}
