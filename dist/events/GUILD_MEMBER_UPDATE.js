"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const GuildMember_1 = __importDefault(require("../structures/GuildMember"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_MEMBER_UPDATE',
    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id);
        const oldMember = guild.members.cache.get(data.user.id);
        client.emit('GuildMemberUpdate', oldMember, new GuildMember_1.default(client, guild, {
            ...data,
            presence: oldMember.presence
        }));
    }
});
//# sourceMappingURL=GUILD_MEMBER_UPDATE.js.map