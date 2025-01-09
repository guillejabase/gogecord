"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageManager_1 = __importDefault(require("../managers/MessageManager"));
const GuildBasedChannel_1 = __importDefault(require("./GuildBasedChannel"));
class GuildTextBasedChannel extends GuildBasedChannel_1.default {
    messages = new MessageManager_1.default(this);
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildTextBasedChannel;
//# sourceMappingURL=GuildTextBasedChannel.js.map