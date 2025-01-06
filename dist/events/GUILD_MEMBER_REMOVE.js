"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_MEMBER_REMOVE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id);
        const member = guild.members.cache.get(data.user.id);
        guild.members.cache.delete(member.user.id);
        client.guilds.cache.set(guild.id, guild);
        client.emit('GuildMemberRemove', member);
    }
});
//# sourceMappingURL=GUILD_MEMBER_REMOVE.js.map