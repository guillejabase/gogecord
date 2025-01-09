"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const GuildBan_1 = __importDefault(require("../structures/GuildBan"));
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildBanManager {
    guild;
    cache = new Collection_1.default();
    constructor(guild) {
        this.guild = guild;
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
    async add(userId, options) {
        try {
            return new GuildBan_1.default(this.guild, await this.guild.client.request({
                method: 'put',
                path: v10_1.Routes.guildBan(this.guild.id, userId),
                body: {
                    last_messages_days: options.days
                },
                reason: options.reason
            }));
        }
        catch (error) {
            throw new Error('Failed to add ban:', error.message);
        }
    }
    async remove(userId) {
        try {
            await this.guild.client.request({
                method: 'delete',
                path: v10_1.Routes.guildBan(this.guild.id, userId)
            });
        }
        catch (error) {
            throw new Error('Failed to remove ban:', error.message);
        }
    }
}
exports.default = GuildBanManager;
//# sourceMappingURL=GuildBanManager.js.map