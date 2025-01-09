"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../util/Collection"));
class ApplicationEmojiManager {
    application;
    cache = new Collection_1.default();
    constructor(application) {
        this.application = application;
        Object.defineProperty(this, 'application', { enumerable: false });
    }
}
exports.default = ApplicationEmojiManager;
//# sourceMappingURL=ApplicationEmojiManager.js.map