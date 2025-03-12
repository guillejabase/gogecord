"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../util/Collection"));
class DMMessageManager {
    channel;
    cache = new Collection_1.default();
    constructor(channel) {
        this.channel = channel;
        Object.defineProperty(this, 'channel', { enumerable: false });
    }
}
exports.default = DMMessageManager;
//# sourceMappingURL=DMMessageManager.js.map