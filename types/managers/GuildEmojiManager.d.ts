import Guild from '../structures/Guild';
import GuildEmoji from '../structures/GuildEmoji';
import Collection from '../util/Collection';
export default class GuildEmojiManager {
    private guild;
    cache: Collection<string, GuildEmoji>;
    constructor(guild: Guild);
    delete(emojiId: string, reason?: string): Promise<void>;
}
//# sourceMappingURL=GuildEmojiManager.d.ts.map