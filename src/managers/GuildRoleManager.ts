import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import GuildRole from '../structures/GuildRole';

import Collection from '../util/Collection';
import Permissions, { type PermissionsResolvable } from '../util/Permissions';

export type GuildRoleManagerOptions = {
    color?: number;
    hoist?: boolean;
    mentionable?: boolean;
    permissions?: PermissionsResolvable;
    position?: number;
};

export default class GuildRoleManager {
    public everyone!: GuildRole;

    public cache = new Collection<string, GuildRole>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }

    public async create(options: GuildRoleManagerOptions & {
        name: string;
    }, reason?: string): Promise<GuildRole> {
        return new GuildRole(this.guild.client, this.guild, await this.guild.client.request({
            method: 'post',
            path: Routes.guildRoles(this.guild.id),
            body: {
                color: options.color || 0,
                hoist: !!options.hoist,
                mentionable: !!options.mentionable,
                name: options.name,
                permissions: new Permissions(options.permissions!).bitField.toString(),
                position: options.position || 0
            },
            reason
        }));
    }
    public async delete(roleId: string, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'delete',
            path: Routes.guildRole(this.guild.id, roleId),
            reason
        });
    }
    public async edit(roleId: string, options: GuildRoleManagerOptions & {
        name?: string;
    }, reason?: string): Promise<GuildRole> {
        return new GuildRole(this.guild.client, this.guild, await this.guild.client.request({
            method: 'patch',
            path: Routes.guildRole(this.guild.id, roleId),
            body: {
                ...options,
                permissions: new Permissions(options.permissions!).bitField.toString()
            },
            reason
        }));
    }
}