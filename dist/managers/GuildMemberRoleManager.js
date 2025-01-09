"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildMemberRoleManager {
    member;
    cache = new Collection_1.default();
    constructor(member) {
        this.member = member;
        Object.defineProperty(this, 'member', { enumerable: false });
    }
    async add(roleId, reason) {
        await this.member.guild.client.request({
            method: 'put',
            path: v10_1.Routes.guildMemberRole(this.member.guild.id, this.member.user.id, roleId),
            reason
        });
    }
    async remove(roleId, reason) {
        await this.member.guild.client.request({
            method: 'delete',
            path: v10_1.Routes.guildMemberRole(this.member.guild.id, this.member.user.id, roleId),
            reason
        });
    }
}
exports.default = GuildMemberRoleManager;
//# sourceMappingURL=GuildMemberRoleManager.js.map