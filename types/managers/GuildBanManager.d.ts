import Guild from '../structures/Guild';
import GuildBan from '../structures/GuildBan';
import Collection from '../util/Collection';
export default class GuildBanManager {
    private guild;
    cache: Collection<string, GuildBan>;
    constructor(guild: Guild);
    add(userId: string, options: {
        reason?: string;
        days?: number;
    }): Promise<GuildBan>;
    remove(userId: string): Promise<void>;
}
//# sourceMappingURL=GuildBanManager.d.ts.map