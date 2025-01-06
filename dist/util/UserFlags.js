"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class UserFlags extends BitField_1.default {
    static bits = {
        Staff: 1,
        Partner: 2,
        Hypesquad: 4,
        BugHunterLevel1: 8,
        HouseBravery: 64,
        HouseBrilliance: 128,
        HouseBalance: 256,
        PremiumEarlySupporter: 512,
        TeamPseudoUser: 1024,
        BugHunterLevel2: 16384,
        VerifiedBot: 65536,
        VerifiedDeveloper: 131072,
        CertifiedModerator: 262144,
        BotHTTPInteractions: 524288,
        ActiveDeveloper: 4194304
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = UserFlags;
//# sourceMappingURL=UserFlags.js.map