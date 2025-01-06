"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatewayEvent_1 = __importDefault(require("../structures/GatewayEvent"));
const GuildMember_1 = __importDefault(require("../structures/GuildMember"));
exports.default = new GatewayEvent_1.default({
    name: 'GUILD_MEMBER_ADD',
    run: (client, data) => {
        client.emit('GuildMemberAdd', new GuildMember_1.default(client, client.guilds.cache.get(data.guild_id), data));
    }
});
//# sourceMappingURL=GUILD_MEMBER_ADD.js.map