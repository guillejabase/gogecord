"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const GuildEmoji_1 = __importDefault(require("../structures/GuildEmoji"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_EMOJIS_UPDATE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id);
        const created = [];
        const updated = [];
        const deleted = [];
        for (const apiEmoji of data.emojis) {
            const existing = guild.emojis.cache.get(apiEmoji.id);
            if (existing) {
                updated.push(new GuildEmoji_1.default(client, guild, apiEmoji));
            }
            else {
                created.push(new GuildEmoji_1.default(client, guild, apiEmoji));
            }
        }
        for (const [id, emoji] of guild.emojis.cache) {
            if (data.emojis.find((emoji) => id === emoji.id)) {
                return;
            }
            deleted.push(emoji);
            guild.emojis.cache.delete(id);
        }
        client.emit('GuildEmojisUpdate', { created, updated, deleted });
    }
});
//# sourceMappingURL=GUILD_EMOJIS_UPDATE.js.map