"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(require("./Channel"));
class GuildBasedChannel extends Channel_1.default {
    guild;
    constructor(guild, data) {
        super(guild.client, data);
        this.guild = guild;
    }
    isGuildTextBased() {
        return [
            'GuildText',
            'GuildAnnouncement',
            'GuildAnnouncementThread',
            'GuildPublicThread',
            'GuildPrivateThread',
            'GuildForum',
            'GuildMedia'
        ].includes(this.type);
    }
    isGuildVoiceBased() {
        return [
            'GuildVoice',
            'GuildStageVoice'
        ].includes(this.type);
    }
}
exports.default = GuildBasedChannel;
//# sourceMappingURL=GuildBasedChannel.js.map