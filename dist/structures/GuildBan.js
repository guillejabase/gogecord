"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class GuildBan {
    client;
    guild;
    reason;
    user;
    constructor(client, guild, data) {
        this.client = client;
        this.guild = guild;
        this.reason = data.reason || undefined;
        this.user = new User_1.default(client, data.user);
        guild.bans.cache.set(this.user.id, this);
        client.guilds.cache.set(guild.id, guild);
        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }
}
exports.default = GuildBan;
//# sourceMappingURL=GuildBan.js.map