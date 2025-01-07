"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../util/Collection"));
const Snowflake_1 = __importDefault(require("../util/Snowflake"));
class GuildEmoji {
    client;
    guild;
    animated;
    available;
    colons;
    created;
    id;
    managed;
    name;
    user;
    roles = new Collection_1.default();
    constructor(client, guild, data) {
        this.client = client;
        this.guild = guild;
        this.animated = !!data.animated;
        this.available = !!data.available;
        this.colons = !!data.require_colons;
        this.id = data.id || undefined;
        const created = this.id ? new Snowflake_1.default(this.id).timestamp : undefined;
        this.created = created ? {
            at: new Date(created),
            timestamp: created
        } : {};
        this.managed = !!data.managed;
        this.name = data.name || undefined;
        this.guild.roles.cache.forEach((role) => {
            if (!data.roles || !data.roles.includes(role.id)) {
                return;
            }
            this.roles.set(role.id, role);
        });
        this.user = data.user ? client.users.cache.get(data.user.id) : undefined;
        if (this.id) {
            guild.emojis.cache.set(this.id, this);
            client.guilds.cache.set(guild.id, guild);
        }
        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false },
            roles: { enumerable: false }
        });
    }
}
exports.default = GuildEmoji;
//# sourceMappingURL=GuildEmoji.js.map