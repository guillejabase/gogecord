import { Routes } from 'discord-api-types/v10';

import GuildMember from '../structures/GuildMember';
import GuildRole from '../structures/GuildRole';

import Collection from '../util/Collection';

export default class GuildMemberRoleManager {
    public cache = new Collection<string, GuildRole>();

    constructor(private member: GuildMember) {
        Object.defineProperty(this, 'member', { enumerable: false });
    }

    public async add(roleId: string, reason?: string): Promise<void> {
        await this.member.client.request({
            method: 'put',
            path: Routes.guildMemberRole(this.member.guild.id, this.member.user.id, roleId),
            reason
        });
    }
    public async remove(roleId: string, reason?: string): Promise<void> {
        await this.member.client.request({
            method: 'delete',
            path: Routes.guildMemberRole(this.member.guild.id, this.member.user.id, roleId),
            reason
        });
    }
}