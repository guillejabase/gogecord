import Ban from '../classes/Ban';
import Client from '../classes/Client';
import Guild from '../classes/Guild';
import User from '../classes/User';

import Collection from '../util/Collection';

export default class BanManager {
    private client: Client;
    private guild: Guild;

    public cache = new Collection<string, Ban>();

    constructor (client: Client, guild: Guild) {
        this.client = client;
        this.guild = guild;

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }

    private path(user: User): string {
        return `/guilds/${this.guild.id}/bans/${user.id}`;
    }

    public async add(user: User, reason?: string, days?: number): Promise<Ban> {
        return new Ban(await this.client.request('put', this.path(user), {
            last_messages_days: days
        }, reason), this.guild);
    }
    public async remove(user: User, reason?: string): Promise<void> {
        return await this.client.request('delete', this.path(user), undefined, reason);
    }
}