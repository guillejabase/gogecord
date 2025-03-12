"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasedChannel_1 = __importDefault(require("./BasedChannel"));
const User_1 = __importDefault(require("./User"));
class DMChannel extends BasedChannel_1.default {
    recipient;
    type = 'DM';
    constructor(client, data) {
        super(client, data);
        this.recipient = new User_1.default(client, data.recipients[0]);
    }
}
exports.default = DMChannel;
//# sourceMappingURL=DMChannel.js.map