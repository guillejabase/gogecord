import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import GuildEmoji from '../structures/GuildEmoji';

import Collection from '../util/Collection';

export default class GuildEmojiManager {
    public cache = new Collection<string, GuildEmoji>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { value: guild });
    }

    public async delete(emojiId: string, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'delete',
            path: Routes.guildEmoji(this.guild.id, emojiId),
            reason
        });
    }
}