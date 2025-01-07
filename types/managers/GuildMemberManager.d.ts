import Guild from '../structures/Guild';
import GuildMember from '../structures/GuildMember';
import Collection from '../util/Collection';
export default class GuildMemberManager {
    private guild;
    cache: Collection<string, GuildMember>;
    constructor(guild: Guild);
    deafen(memberId: string, reason?: string): Promise<void>;
    mute(memberId: string, reason?: string): Promise<void>;
    kick(memberId: string, reason?: string): Promise<void>;
    timeout(memberId: string, time?: number, reason?: string): Promise<void>;
    undeafen(memberId: string): Promise<void>;
    unmute(memberId: string): Promise<void>;
    untimeout(memberId: string): Promise<void>;
}
//# sourceMappingURL=GuildMemberManager.d.ts.map