import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Role from '../classes/Role';

import Collection from '../util/Collection';
import Permissions, { Permission } from '../util/Permissions';

export default class RoleManager {
    private client: Client;
    private guild: Guild;

    public cache = new Collection<string, Role>();

    constructor (client: Client, guild: Guild) {
        this.client = client;
        this.guild = guild;

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }

    private path(role?: Role): string {
        return `/guilds/${this.guild.id}/roles${role ? `/${role.id}` : ''}`;
    }

    public async create(options: {
        color?: number;
        hoist?: boolean;
        mentionable?: boolean;
        name: string;
        permissions?: Permission[];
        position?: number;
    }, reason?: string): Promise<Role> {
        return new Role(await this.client.request('post', this.path(), {
            color: options.color || 0,
            hoist: !!options.hoist,
            mentionable: !!options.mentionable,
            name: options.name,
            permissions: options.permissions ? new Permissions(options.permissions).bitField.toString() : '0',
            position: options.position || 0
        }, reason), this.guild);
    }
    public async delete(role: Role, reason?: string): Promise<void> {
        return await this.client.request('delete', this.path(role), undefined, reason);
    }
    public async edit(role: Role, options: {
        color?: number;
        hoist?: boolean;
        mentionable?: boolean;
        name?: string;
        permissions?: Permission[];
        position?: number;
    }, reason?: string): Promise<Role> {
        return new Role(await this.client.request('patch', this.path(role), {
            ...options,
            permissions: options.permissions ? new Permissions(options.permissions).bitField.toString() : undefined
        }, reason), this.guild);
    }
}