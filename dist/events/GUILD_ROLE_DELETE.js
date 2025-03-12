"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_ROLE_DELETE',
    run(client, data) {
        const guild = client.guilds.cache.get(data.guild_id);
        const role = guild.roles.cache.get(data.role_id);
        guild.roles.cache.delete(role.id);
        client.guilds.cache.set(guild.id, guild);
        client.emit(this.name, role);
    }
});
//# sourceMappingURL=GUILD_ROLE_DELETE.js.map