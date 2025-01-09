import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import GuildBan from '../structures/GuildBan';

import Collection from '../util/Collection';

export default class GuildBanManager {
    public cache = new Collection<string, GuildBan>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }

    public async add(userId: string, options: {
        reason?: string;
        days?: number;
    }): Promise<GuildBan> {
        try {
            return new GuildBan(this.guild, await this.guild.client.request({
                method: 'put',
                path: Routes.guildBan(this.guild.id, userId),
                body: {
                    last_messages_days: options.days
                },
                reason: options.reason
            }));
        } catch (error: any) {
            throw new Error('Failed to add ban:', error.message);
        }
    }
    public async remove(userId: string): Promise<void> {
        try {
            await this.guild.client.request({
                method: 'delete',
                path: Routes.guildBan(this.guild.id, userId)
            });
        } catch (error: any) {
            throw new Error('Failed to remove ban:', error.message);
        }
    }
}