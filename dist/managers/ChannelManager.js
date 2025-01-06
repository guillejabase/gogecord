"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../util/Collection"));
class ChannelManager {
    client;
    cache = new Collection_1.default();
    constructor(client) {
        this.client = client;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
}
exports.default = ChannelManager;
//# sourceMappingURL=ChannelManager.js.map