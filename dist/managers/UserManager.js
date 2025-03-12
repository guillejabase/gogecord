"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const User_1 = __importDefault(require("../structures/User"));
const Collection_1 = __importDefault(require("../util/Collection"));
class UserManager {
    client;
    cache = new Collection_1.default();
    constructor(client) {
        this.client = client;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
    async fetch(userId) {
        return new User_1.default(this.client, await this.client.request({
            method: 'GET',
            path: v10_1.Routes.user(userId)
        }));
    }
}
exports.default = UserManager;
//# sourceMappingURL=UserManager.js.map