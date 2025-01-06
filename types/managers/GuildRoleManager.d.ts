import Guild from '../structures/Guild';
import GuildRole from '../structures/GuildRole';
import Collection from '../util/Collection';
import { type PermissionsResolvable } from '../util/Permissions';
export type GuildRoleManagerOptions = {
    color?: number;
    hoist?: boolean;
    mentionable?: boolean;
    permissions?: PermissionsResolvable;
    position?: number;
};
export default class GuildRoleManager {
    private guild;
    everyone: GuildRole;
    cache: Collection<string, GuildRole>;
    constructor(guild: Guild);
    create(options: GuildRoleManagerOptions & {
        name: string;
    }, reason?: string): Promise<GuildRole>;
    delete(roleId: string, reason?: string): Promise<void>;
    edit(roleId: string, options: GuildRoleManagerOptions & {
        name?: string;
    }, reason?: string): Promise<GuildRole>;
}
//# sourceMappingURL=GuildRoleManager.d.ts.map