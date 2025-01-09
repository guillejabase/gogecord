"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildStickerManager {
    guild;
    cache = new Collection_1.default();
    constructor(guild) {
        this.guild = guild;
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
}
exports.default = GuildStickerManager;
//# sourceMappingURL=GuildStickerManager.js.map