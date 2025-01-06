"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const Presence_1 = __importDefault(require("../structures/Presence"));
exports.default = new GatewayEvent_1.default({
    name: 'PRESENCE_UPDATE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id);
        const member = guild.members.cache.get(data.user.id);
        const oldPresence = member.presence;
        member.presence = new Presence_1.default(data);
        guild.members.cache.set(member.user.id, member);
        client.guilds.cache.set(guild.id, guild);
        client.emit('PresenceUpdate', oldPresence, member.presence);
    }
});
//# sourceMappingURL=PRESENCE_UPDATE.js.map