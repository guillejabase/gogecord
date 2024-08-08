import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Role from '../classes/Role';
import Collection from '../util/Collection';
import { Permission } from '../util/Permissions';
export default class RoleManager {
    private client;
    private guild;
    cache: Collection<string, Role>;
    constructor(client: Client, guild: Guild);
    private path;
    create(options: {
        color?: number;
        hoist?: boolean;
        mentionable?: boolean;
        name: string;
        permissions?: Permission[];
        position?: number;
    }, reason?: string): Promise<Role>;
    delete(role: Role, reason?: string): Promise<void>;
    edit(role: Role, options: {
        color?: number;
        hoist?: boolean;
        mentionable?: boolean;
        name?: string;
        permissions?: Permission[];
        position?: number;
    }, reason?: string): Promise<Role>;
}
