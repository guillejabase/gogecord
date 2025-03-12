"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasedChannel_1 = __importDefault(require("./BasedChannel"));
class GuildBasedChannel extends BasedChannel_1.default {
    guild;
    name;
    constructor(guild, data) {
        super(guild.client, data);
        this.guild = guild;
        this.name = data.name;
        Object.defineProperty(this, 'guild', { enumerable: false });
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