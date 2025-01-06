"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Collection_1 = __importDefault(require("../util/Collection"));
const GuildRoleFlags_1 = __importDefault(require("../util/GuildRoleFlags"));
const Permissions_1 = __importDefault(require("../util/Permissions"));
const Snowflake_1 = __importDefault(require("../util/Snowflake"));
class GuildRole {
    client;
    guild;
    color;
    created;
    flags;
    hoist;
    icon;
    id;
    managed;
    mentionable;
    name;
    permissions;
    position;
    members = new Collection_1.default();
    constructor(client, guild, data) {
        this.client = client;
        this.guild = guild;
        this.color = {
            decimal: data.color,
            hex: data.color.toString(16).padStart(6, '0')
        };
        this.id = data.id;
        const created = new Snowflake_1.default(this.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.flags = new GuildRoleFlags_1.default(data.flags);
        this.hoist = data.hoist;
        this.icon = data.icon || undefined;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.name = data.name;
        this.permissions = new Permissions_1.default(BigInt(data.permissions));
        this.position = data.position;
        guild.roles.cache.set(this.id, this);
        client.guilds.cache.set(this.guild.id, this.guild);
        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false },
            members: { enumerable: false }
        });
    }
    iconURL(options) {
        if (!this.icon) {
            return undefined;
        }
        options.format = options.format || 'png';
        return v10_1.RouteBases.cdn +
            v10_1.CDNRoutes.roleIcon(this.id, this.icon, options.format) +
            options.size ? `?size=${options.size}` : '';
    }
    toString() {
        return `<@&${this.id}>`;
    }
}
exports.default = GuildRole;
//# sourceMappingURL=GuildRole.js.map