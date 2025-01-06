"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const GuildRole_1 = __importDefault(require("../structures/GuildRole"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_ROLE_CREATE',
    run: (client, data) => {
        client.emit('GuildRoleCreate', new GuildRole_1.default(client, client.guilds.cache.get(data.guild_id), data.role));
    }
});
//# sourceMappingURL=GUILD_ROLE_CREATE.js.map