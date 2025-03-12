"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasedMessage_1 = __importDefault(require("./BasedMessage"));
class DMMessage extends BasedMessage_1.default {
    author;
    constructor(client, data) {
        super(client, data);
        this.author = client.users.cache.get(data.author.id);
    }
}
exports.default = DMMessage;
//# sourceMappingURL=DMMessage.js.map