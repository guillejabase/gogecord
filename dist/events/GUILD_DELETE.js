"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_DELETE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.id);
        client.guilds.cache.delete(guild.id);
        client.emit('GuildDelete', guild);
    }
});
//# sourceMappingURL=GUILD_DELETE.js.map