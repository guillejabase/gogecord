"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildBasedChannel_1 = __importDefault(require("./GuildBasedChannel"));
class GuildThreadChannel extends GuildBasedChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildThreadChannel;
//# sourceMappingURL=GuildThreadChannel.js.map