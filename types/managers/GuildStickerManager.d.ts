import Guild from '../structures/Guild';
import GuildSticker from '../structures/GuildSticker';
import Collection from '../util/Collection';
export default class GuildStickerManager {
    private guild;
    cache: Collection<string, GuildSticker>;
    constructor(guild: Guild);
    delete(stickerId: string, reason?: string): Promise<void>;
}
//# sourceMappingURL=GuildStickerManager.d.ts.map