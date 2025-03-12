"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const ApplicationEmojiManager_1 = __importDefault(require("../managers/ApplicationEmojiManager"));
const Application_1 = __importDefault(require("./Application"));
class PartialApplication {
    client;
    emojis = new ApplicationEmojiManager_1.default(this);
    constructor(client) {
        this.client = client;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
    async fetch() {
        return new Application_1.default(this.client, await this.client.request({
            method: 'GET',
            path: v10_1.Routes.currentApplication()
        }));
    }
}
exports.default = PartialApplication;
//# sourceMappingURL=PartialApplication.js.map