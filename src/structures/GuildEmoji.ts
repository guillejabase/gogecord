import type { APIEmoji } from 'discord-api-types/v10';

import Client from './Client';
import Guild from './Guild';
import GuildRole from './GuildRole';
import User from './User';

import Collection from '../util/Collection';
import Snowflake from '../util/Snowflake';

export default class GuildEmoji {
    public animated: boolean;
    public available: boolean;
    public colons: boolean;
    public created: {
        at?: Date;
        timestamp?: number;
    };
    public id?: string;
    public managed: boolean;
    public name?: string;
    public user?: User;

    public roles = new Collection<string, GuildRole>();

    constructor(public client: Client, public guild: Guild, data: APIEmoji) {
        this.animated = !!data.animated;
        this.available = !!data.available;
        this.colons = !!data.require_colons;
        this.id = data.id || undefined;

        const created = this.id ? new Snowflake(this.id).timestamp : undefined;
        this.created = created ? {
            at: new Date(created),
            timestamp: created
        } : {};

        this.managed = !!data.managed;
        this.name = data.name || undefined;

        this.guild.roles.cache.forEach((role) => {
            if (!data.roles || !data.roles.includes(role.id)) {
                return;
            }

            this.roles.set(role.id, role);
        });

        this.user = data.user ? client.users.cache.get(data.user.id) : undefined;

        if (this.id) {
            guild.emojis.cache.set(this.id, this);
            client.guilds.cache.set(guild.id, guild);
        }

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false },
            roles: { enumerable: false }
        });
    }
}