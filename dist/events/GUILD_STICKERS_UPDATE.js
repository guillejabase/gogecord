"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const GuildSticker_1 = __importDefault(require("../structures/GuildSticker"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_STICKERS_UPDATE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id);
        const created = [];
        const updated = [];
        const deleted = [];
        for (const apiSticker of data.stickers) {
            const existing = guild.stickers.cache.get(apiSticker.id);
            if (existing) {
                updated.push(new GuildSticker_1.default(client, guild, apiSticker));
            }
            else {
                created.push(new GuildSticker_1.default(client, guild, apiSticker));
            }
        }
        for (const [id, sticker] of guild.stickers.cache) {
            if (data.stickers.find((sticker) => id === sticker.id)) {
                return;
            }
            deleted.push(sticker);
            guild.stickers.cache.delete(id);
        }
        client.emit('GuildStickersUpdate', { created, updated, deleted });
    }
});
//# sourceMappingURL=GUILD_STICKERS_UPDATE.js.map