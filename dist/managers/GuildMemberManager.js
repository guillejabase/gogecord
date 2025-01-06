"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildMemberManager {
    guild;
    me;
    cache = new Collection_1.default();
    constructor(guild) {
        this.guild = guild;
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
    async deafen(memberId, reason) {
        await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            body: {
                deaf: true
            },
            reason
        });
    }
    async mute(memberId, reason) {
        await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            body: {
                mute: true
            },
            reason
        });
    }
    async kick(memberId, reason) {
        await this.guild.client.request({
            method: 'delete',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            reason
        });
    }
    async timeout(memberId, time = 60000, reason) {
        await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            body: {
                communication_disabled_until: new Date(Date.now() + time).toISOString()
            },
            reason
        });
    }
    async undeafen(memberId) {
        await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            body: {
                deaf: false
            }
        });
    }
    async unmute(memberId) {
        await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            body: {
                mute: false
            }
        });
    }
    async untimeout(memberId) {
        await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildMember(this.guild.id, memberId),
            body: {
                communication_disabled_until: null
            }
        });
    }
}
exports.default = GuildMemberManager;
//# sourceMappingURL=GuildMemberManager.js.map