"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasedMessage_1 = __importDefault(require("./BasedMessage"));
class GuildMessage extends BasedMessage_1.default {
    guild;
    member;
    constructor(guild, data) {
        super(guild.client, data);
        this.guild = guild;
        this.member = guild.members.cache.get(data.author.id);
    }
}
exports.default = GuildMessage;
//# sourceMappingURL=GuildMessage.js.map