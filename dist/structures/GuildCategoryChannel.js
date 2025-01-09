"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildBasedChannel_1 = __importDefault(require("./GuildBasedChannel"));
class GuildCategoryChanel extends GuildBasedChannel_1.default {
    type = 'GuildCategory';
    constructor(guild, data) {
        super(guild, data);
    }
}
exports.default = GuildCategoryChanel;
//# sourceMappingURL=GuildCategoryChannel.js.map