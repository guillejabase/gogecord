"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const GuildRole_1 = __importDefault(require("../structures/GuildRole"));
const Collection_1 = __importDefault(require("../util/Collection"));
const Permissions_1 = __importDefault(require("../util/Permissions"));
class GuildRoleManager {
    guild;
    everyone;
    cache = new Collection_1.default();
    constructor(guild) {
        this.guild = guild;
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
    async create(options, reason) {
        return new GuildRole_1.default(this.guild, await this.guild.client.request({
            method: 'post',
            path: v10_1.Routes.guildRoles(this.guild.id),
            body: {
                color: options.color || 0,
                hoist: !!options.hoist,
                mentionable: !!options.mentionable,
                name: options.name,
                permissions: new Permissions_1.default(options.permissions).bitField.toString(),
                position: options.position || 0
            },
            reason
        }));
    }
    async delete(roleId, reason) {
        await this.guild.client.request({
            method: 'delete',
            path: v10_1.Routes.guildRole(this.guild.id, roleId),
            reason
        });
    }
    async edit(roleId, options, reason) {
        return new GuildRole_1.default(this.guild, await this.guild.client.request({
            method: 'patch',
            path: v10_1.Routes.guildRole(this.guild.id, roleId),
            body: {
                ...options,
                permissions: new Permissions_1.default(options.permissions).bitField.toString()
            },
            reason
        }));
    }
}
exports.default = GuildRoleManager;
//# sourceMappingURL=GuildRoleManager.js.map