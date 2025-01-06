import { type APIRole, CDNRoutes, type RoleIconFormat, RouteBases } from 'discord-api-types/v10';

import Client from './Client';
import Guild from './Guild';
import GuildMember from './GuildMember';

import Collection from '../util/Collection';
import GuildRoleFlags from '../util/GuildRoleFlags';
import type { ImageFormat, ImageSize } from '../util/Image';
import Permissions from '../util/Permissions';
import Snowflake from '../util/Snowflake';

export default class GuildRole {
    public color: {
        decimal: number;
        hex: string;
    };
    public created: {
        at: Date;
        timestamp: number;
    };
    public flags: GuildRoleFlags;
    public hoist: boolean;
    public icon?: string;
    public id: string;
    public managed: boolean;
    public mentionable: boolean;
    public name: string;
    public permissions: Permissions;
    public position: number;

    public members = new Collection<string, GuildMember>();

    constructor(public client: Client, public guild: Guild, data: APIRole) {
        this.color = {
            decimal: data.color,
            hex: data.color.toString(16).padStart(6, '0')
        };
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };

        this.flags = new GuildRoleFlags(data.flags);
        this.hoist = data.hoist;
        this.icon = data.icon || undefined;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.name = data.name;
        this.permissions = new Permissions(BigInt(data.permissions));
        this.position = data.position;

        guild.roles.cache.set(this.id, this);
        client.guilds.cache.set(this.guild.id, this.guild);

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false },
            members: { enumerable: false }
        });
    }

    public iconURL(options: {
        format?: ImageFormat;
        size?: Exclude<ImageSize, 'gif'>;
    }): string | undefined {
        if (!this.icon) {
            return undefined;
        }

        options.format = options.format || 'png';

        return RouteBases.cdn +
            CDNRoutes.roleIcon(this.id, this.icon, options.format as RoleIconFormat) +
            options.size ? `?size=${options.size}` : '';
    }
    public toString(): string {
        return `<@&${this.id}>`;
    }
}