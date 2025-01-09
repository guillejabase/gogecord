"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildTextBasedChannel_1 = __importDefault(require("./GuildTextBasedChannel"));
class GuildVoiceBasedChannel extends GuildTextBasedChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildVoiceBasedChannel;
//# sourceMappingURL=GuildVoiceBasedChannel.js.map