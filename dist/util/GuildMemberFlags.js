"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class GuildMemberFlags extends BitField_1.default {
    static bits = {
        DidRejoin: 1,
        CompletedOnboarding: 2,
        BypassesVerification: 4,
        StartedOnboarding: 8,
        IsGuest: 16,
        StartedHomeActions: 32,
        CompletedHomeActions: 64,
        AutomodQuarantinedGuildMemberNameOrGuildNickname: 128,
        DMSettingsUpsellAcknowledged: 512
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = GuildMemberFlags;
//# sourceMappingURL=GuildMemberFlags.js.map