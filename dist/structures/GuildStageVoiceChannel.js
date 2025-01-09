"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildVoiceBasedChannel_1 = __importDefault(require("./GuildVoiceBasedChannel"));
class GuildStageVoiceChannel extends GuildVoiceBasedChannel_1.default {
    type = 'GuildStageVoice';
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildStageVoiceChannel;
//# sourceMappingURL=GuildStageVoiceChannel.js.map