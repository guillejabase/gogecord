"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class ChannelFlags extends BitField_1.default {
    static bits = {
        GuildFeedRemoved: 1,
        Pinned: 2,
        ActiveChannelsRemoved: 4,
        RequireTag: 16,
        IsSpam: 32,
        IsGuildResourceChannel: 128,
        ClydeAI: 256,
        IsScheduledForDeletion: 512,
        HideMediaDownloadOptions: 32768
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = ChannelFlags;
//# sourceMappingURL=ChannelFlags.js.map