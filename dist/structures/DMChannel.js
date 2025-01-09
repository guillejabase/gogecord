"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(require("./Channel"));
class DMChannel extends Channel_1.default {
    type = 'DM';
    constructor(client, data) {
        super(client, data);
    }
}
exports.default = DMChannel;
//# sourceMappingURL=DMChannel.js.map