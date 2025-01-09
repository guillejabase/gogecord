"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelTypes = void 0;
const ChannelFlags_1 = __importDefault(require("../util/ChannelFlags"));
const Snowflake_1 = __importDefault(require("../util/Snowflake"));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GuildText"] = 0] = "GuildText";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GuildVoice"] = 2] = "GuildVoice";
    ChannelTypes[ChannelTypes["GroupDM"] = 3] = "GroupDM";
    ChannelTypes[ChannelTypes["GuildCategory"] = 4] = "GuildCategory";
    ChannelTypes[ChannelTypes["GuildAnnouncement"] = 5] = "GuildAnnouncement";
    ChannelTypes[ChannelTypes["GuildAnnouncementThread"] = 10] = "GuildAnnouncementThread";
    ChannelTypes[ChannelTypes["GuildPublicThread"] = 11] = "GuildPublicThread";
    ChannelTypes[ChannelTypes["GuildPrivateThread"] = 12] = "GuildPrivateThread";
    ChannelTypes[ChannelTypes["GuildStageVoice"] = 13] = "GuildStageVoice";
    ChannelTypes[ChannelTypes["GuildDirectory"] = 14] = "GuildDirectory";
    ChannelTypes[ChannelTypes["GuildForum"] = 15] = "GuildForum";
    ChannelTypes[ChannelTypes["GuildMedia"] = 16] = "GuildMedia";
})(ChannelTypes || (exports.ChannelTypes = ChannelTypes = {}));
class Channel {
    client;
    created;
    flags;
    id;
    type;
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        const created = new Snowflake_1.default(data.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.flags = new ChannelFlags_1.default(data.flags);
        this.type = Object
            .keys(ChannelTypes)
            .find((key) => {
            ChannelTypes[key] === data.type;
        });
        Object.defineProperty(this, 'client', { enumerable: false });
    }
    toString() {
        return `<#${this.id}>`;
    }
}
exports.default = Channel;
//# sourceMappingURL=Channel.js.map