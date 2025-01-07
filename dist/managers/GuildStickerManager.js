"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildStickerManager {
    guild;
    cache = new Collection_1.default();
    constructor(guild) {
        this.guild = guild;
        Object.defineProperty(this, 'guild', { value: guild });
    }
    async delete(stickerId, reason) {
        await this.guild.client.request({
            method: 'delete',
            path: v10_1.Routes.guildSticker(this.guild.id, stickerId),
            reason
        });
    }
}
exports.default = GuildStickerManager;
//# sourceMappingURL=GuildStickerManager.js.map