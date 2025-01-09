"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class ApplicationFlags extends BitField_1.default {
    static bits = {
        EmbeddedReleased: 2,
        ManagedEmoji: 4,
        EmbeddedIAP: 8,
        GroupDMCreate: 16,
        ApplicationAutoModerationRuleCreateBadge: 64,
        RPCHasConnected: 2048,
        GatewayPresence: 4096,
        GatewayPresenceLimited: 8192,
        GatewayGuildMembers: 16384,
        GatewayGuildMembersLimited: 32768,
        VerificationPendingGuildLimit: 65536,
        Embedded: 131072,
        GatewayMessageContent: 262144,
        GatewayMessageContentLimited: 524288,
        EmbeddedFirstParty: 1048576,
        ApplicationCommandBadge: 8388608
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = ApplicationFlags;
//# sourceMappingURL=ApplicationFlags.js.map