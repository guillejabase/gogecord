"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Message_1 = __importDefault(require("../structures/Message"));
const Collection_1 = __importDefault(require("../util/Collection"));
class MessageManager {
    channel;
    cache = new Collection_1.default();
    constructor(channel) {
        this.channel = channel;
        Object.defineProperty(this, 'channel', { enumerable: false });
    }
    async send(options) {
        return new Message_1.default(this.channel.client, await this.channel.client.request({
            method: 'post',
            path: v10_1.Routes.channelMessages(this.channel.id),
            body: {
                allowed_mentions: {
                    replied_user: options.mentions != undefined ? options.mentions : this.channel.client.mentions
                },
                content: options.content || undefined,
                embeds: options.embeds || undefined,
                message_reference: options.reference ? {
                    message_id: options.reference
                } : undefined
            }
        }));
    }
}
exports.default = MessageManager;
//# sourceMappingURL=MessageManager.js.map