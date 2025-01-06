"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BitField_1 = __importDefault(require("./BitField"));
class GuildRoleFlags extends BitField_1.default {
    static bits = {
        InPrompt: 1
    };
    constructor(...bits) {
        super(...bits);
    }
    has(bit) {
        return super.has(bit);
    }
}
exports.default = GuildRoleFlags;
//# sourceMappingURL=GuildRoleFlags.js.map