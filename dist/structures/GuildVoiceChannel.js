"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildVoiceBasedChannel_1 = __importDefault(require("./GuildVoiceBasedChannel"));
class GuildVoiceChannel extends GuildVoiceBasedChannel_1.default {
    type = 'GuildVoice';
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildVoiceChannel;
//# sourceMappingURL=GuildVoiceChannel.js.map