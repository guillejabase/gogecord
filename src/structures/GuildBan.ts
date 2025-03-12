import type { APIBan } from 'discord-api-types/v10';

import Guild from './Guild';
import User from './User';

export default class GuildBan {
    public reason?: string;
    public user: User;

    public constructor(public guild: Guild, data: APIBan) {
        this.reason = data.reason || undefined;
        this.user = new User(guild.client, data.user);

        guild.bans.cache.set(this.user.id, this);
        guild.client.guilds.cache.set(guild.id, guild);

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }
}