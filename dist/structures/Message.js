"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageFlags_1 = __importDefault(require("../util/MessageFlags"));
class Message {
    client;
    author;
    // public channel: any;
    content;
    created;
    edited;
    flags;
    id;
    constructor(client, data) {
        this.client = client;
        this.author = client.users.cache.get(data.author.id);
        // this.channel = client.channels.cache.get(data.channel_id)! as DMChannel | GuildTextBasedChannel;
        this.content = data.content;
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
        this.id = data.id;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map