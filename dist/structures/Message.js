"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageFlags_1 = __importDefault(require("../util/MessageFlags"));
class Message {
    client;
    author;
    content;
    created;
    edited;
    flags;
    guild;
    id;
    member;
    constructor(client, data) {
        this.client = client;
        this.author = client.users.cache.get(data.author.id);
        this.content = data.content;
        data.flags;
        const created = Date.parse(data.timestamp);
        this.created = {
            at: new Date(created),
            timestamp: created
        };
        const edited = Date.parse(data.edited_timestamp) || undefined;
        this.edited = edited ? {
            since: new Date(edited),
            timestamp: edited
        } : {};
        this.flags = new MessageFlags_1.default(data.flags);
        if (data.guild_id) {
            this.guild = client.guilds.cache.get(data.guild_id);
            this.member = this.guild.members.cache.get(data.author.id);
        }
        this.id = data.id;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map