"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class Intents extends BitField_1.default {
    static bits = {
        Guilds: 1,
        GuildMembers: 2,
        GuildModeration: 4,
        GuildEmojisAndStickers: 8,
        GuildIntegrations: 16,
        GuildWebhooks: 32,
        GuildInvites: 64,
        GuildVoiceStates: 128,
        GuildPresences: 256,
        GuildMessages: 512,
        GuildMessageReactions: 1024,
        GuildMessageTyping: 2048,
        DirectMessages: 4096,
        DirectMessageReactions: 8192,
        DirectMessageTyping: 16384,
        MessageContent: 32768,
        GuildScheduledEvents: 65536,
        AutoModerationConfiguration: 1048576,
        AutoModerationExecution: 2097152,
        GuildMessagePolls: 16777216,
        DirectMessagePolls: 33554432
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = Intents;
//# sourceMappingURL=Intents.js.map