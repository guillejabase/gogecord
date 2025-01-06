"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Snowflake_1 = __importDefault(require("../util/Snowflake"));
const UserFlags_1 = __importDefault(require("../util/UserFlags"));
class User {
    client;
    avatar;
    bot;
    created;
    discriminator;
    flags;
    globalName;
    id;
    system;
    username;
    constructor(client, data) {
        this.client = client;
        this.avatar = data.avatar || undefined;
        this.bot = !!data.bot;
        this.id = data.id;
        const created = new Snowflake_1.default(this.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.discriminator = data.discriminator != '0' ? data.discriminator : undefined;
        this.flags = new UserFlags_1.default(data.flags);
        this.globalName = data.global_name || undefined;
        this.system = !!data.system;
        this.username = data.username;
        Object.defineProperty(this, 'client', { enumerable: false });
    }
    avatarURL(options) {
        if (!this.avatar) {
            return undefined;
        }
        options.format = options.format || (this.avatar.startsWith('a_') ? 'gif' : 'png');
        return v10_1.RouteBases.cdn +
            v10_1.CDNRoutes.userAvatar(this.id, this.avatar, options.format) +
            (options.size ? `?size=${options.size}` : '');
    }
    toString() {
        return `<@${this.id}>`;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map