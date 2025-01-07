import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import GuildSticker from '../structures/GuildSticker';

import Collection from '../util/Collection';

export default class GuildStickerManager {
    public cache = new Collection<string, GuildSticker>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { value: guild });
    }

    public async delete(stickerId: string, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'delete',
            path: Routes.guildSticker(this.guild.id, stickerId),
            reason
        });
    }
}