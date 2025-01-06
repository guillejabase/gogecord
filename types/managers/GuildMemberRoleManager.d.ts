import GuildMember from '../structures/GuildMember';
import GuildRole from '../structures/GuildRole';
import Collection from '../util/Collection';
export default class GuildMemberRoleManager {
    private member;
    cache: Collection<string, GuildRole>;
    constructor(member: GuildMember);
    add(roleId: string, reason?: string): Promise<void>;
    remove(roleId: string, reason?: string): Promise<void>;
}
//# sourceMappingURL=GuildMemberRoleManager.d.ts.map