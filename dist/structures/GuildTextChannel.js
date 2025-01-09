"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildTextBasedChannel_1 = __importDefault(require("./GuildTextBasedChannel"));
class GuildTextChannel extends GuildTextBasedChannel_1.default {
    type = 'GuildText';
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildTextChannel;
//# sourceMappingURL=GuildTextChannel.js.map