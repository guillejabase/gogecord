"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const GuildRole_1 = __importDefault(require("../structures/GuildRole"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_ROLE_UPDATE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id);
        client.emit('GuildRoleUpdate', guild.roles.cache.get(data.role.id), new GuildRole_1.default(guild, data.role));
    }
});
//# sourceMappingURL=GUILD_ROLE_UPDATE.js.map