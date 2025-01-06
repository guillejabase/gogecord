import { Routes } from 'discord-api-types/v10';

import Client from '../structures/Client';
import Guild from '../structures/Guild';

import Collection from '../util/Collection';

export default class GuildManager {
    public cache = new Collection<string, Guild>();

    constructor(private client: Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public async fetch(guildId: string): Promise<Guild> {
        return new Guild(this.client, await this.client.request({
            method: 'get',
            path: Routes.guild(guildId)
        }));
    }
}