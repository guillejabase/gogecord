"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Guild_1 = __importDefault(require("../structures/Guild"));
const Collection_1 = __importDefault(require("../util/Collection"));
class GuildManager {
    client;
    cache = new Collection_1.default();
    constructor(client) {
        this.client = client;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
    async fetch(guildId) {
        return new Guild_1.default(this.client, await this.client.request({
            method: 'get',
            path: v10_1.Routes.guild(guildId)
        }));
    }
}
exports.default = GuildManager;
//# sourceMappingURL=GuildManager.js.map