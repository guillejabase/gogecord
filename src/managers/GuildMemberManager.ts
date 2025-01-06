import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import GuildMember from '../structures/GuildMember';

import Collection from '../util/Collection';

export default class GuildMemberManager {
    public me!: GuildMember;

    public cache = new Collection<string, GuildMember>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }

    public async deafen(memberId: string, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'patch',
            path: Routes.guildMember(this.guild.id, memberId),
            body: {
                deaf: true
            },
            reason
        });
    }
    public async mute(memberId: string, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'patch',
            path: Routes.guildMember(this.guild.id, memberId),
            body: {
                mute: true
            },
            reason
        });
    }
    public async kick(memberId: string, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'delete',
            path: Routes.guildMember(this.guild.id, memberId),
            reason
        });
    }
    public async timeout(memberId: string, time: number = 60000, reason?: string): Promise<void> {
        await this.guild.client.request({
            method: 'patch',
            path: Routes.guildMember(this.guild.id, memberId),
            body: {
                communication_disabled_until: new Date(Date.now() + time).toISOString()
            },
            reason
        });
    }
    public async undeafen(memberId: string): Promise<void> {
        await this.guild.client.request({
            method: 'patch',
            path: Routes.guildMember(this.guild.id, memberId),
            body: {
                deaf: false
            }
        });
    }
    public async unmute(memberId: string): Promise<void> {
        await this.guild.client.request({
            method: 'patch',
            path: Routes.guildMember(this.guild.id, memberId),
            body: {
                mute: false
            }
        });
    }
    public async untimeout(memberId: string): Promise<void> {
        await this.guild.client.request({
            method: 'patch',
            path: Routes.guildMember(this.guild.id, memberId),
            body: {
                communication_disabled_until: null
            }
        });
    }
}