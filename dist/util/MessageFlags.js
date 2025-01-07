"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class MessageFlags extends BitField_1.default {
    static bits = {
        Crossposted: 1,
        IsCrosspost: 2,
        SuppressEmbeds: 4,
        SourceMessageDeleted: 8,
        Urgent: 16,
        HasThread: 32,
        Ephemeral: 64,
        Loading: 128,
        FailedToMentionSomeRolesInThread: 256,
        SuppressNotifications: 4096,
        IsVoiceMessage: 8192
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = MessageFlags;
//# sourceMappingURL=MessageFlags.js.map