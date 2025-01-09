"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const GuildMemberRoleManager_1 = __importDefault(require("../managers/GuildMemberRoleManager"));
const Presence_1 = __importDefault(require("./Presence"));
const User_1 = __importDefault(require("./User"));
const GuildMemberFlags_1 = __importDefault(require("../util/GuildMemberFlags"));
const Permissions_1 = __importDefault(require("../util/Permissions"));
class GuildMember {
    guild;
    avatar;
    boosting;
    deaf;
    flags;
    joined;
    muted;
    nickname;
    permissions;
    presence;
    timedOut;
    user;
    roles = new GuildMemberRoleManager_1.default(this);
    constructor(guild, data) {
        this.guild = guild;
        this.avatar = data.avatar || undefined;
        const boosting = Date.parse(data.premium_since);
        this.boosting = {
            since: data.premium_since ? new Date(boosting) : undefined,
            timestamp: boosting || undefined
        };
        this.deaf = !!data.deaf;
        this.flags = new GuildMemberFlags_1.default(data.flags);
        const joined = Date.parse(data.joined_at);
        this.joined = {
            at: new Date(joined),
            timestamp: joined
        };
        this.muted = !!data.mute;
        this.nickname = data.nick || undefined;
        this.guild.roles.cache.forEach((role) => {
            if (!data.roles.includes(role.id)) {
                return;
            }
            this.roles.cache.set(role.id, role);
        });
        let bitField = BigInt(0);
        this.roles.cache.forEach((role) => {
            bitField |= BigInt(role.permissions.bitField);
        });
        this.permissions = new Permissions_1.default(bitField);
        this.presence = data.presence || new Presence_1.default();
        const parsed = Date.parse(data.communication_disabled_until);
        const timeout = parsed > Date.now() ? parsed : undefined;
        this.timedOut = {
            until: timeout ? new Date(timeout) : undefined,
            timestamp: timeout
        };
        this.user = new User_1.default(guild.client, data.user);
        guild.members.cache.set(this.user.id, this);
        guild.client.users.cache.set(this.user.id, this.user);
        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false },
            roles: { enumerable: false }
        });
    }
    avatarURL(options) {
        if (!this.avatar) {
            return undefined;
        }
        options.format = options.format || (this.avatar.startsWith('a_') ? 'gif' : 'png');
        return v10_1.RouteBases.cdn +
            v10_1.CDNRoutes.guildMemberAvatar(this.guild.id, this.user.id, this.avatar, options.format) +
            (options.size ? `?size=${options.size}` : '');
    }
    async deafen(reason) {
        await this.guild.members.deafen(this.user.id, reason);
    }
    async mute(reason) {
        await this.guild.members.mute(this.user.id, reason);
    }
    async kick(reason) {
        await this.guild.members.kick(this.user.id, reason);
    }
    async timeout(time, reason) {
        await this.guild.members.timeout(this.user.id, time, reason);
    }
    async undeafen() {
        await this.guild.members.undeafen(this.user.id);
    }
    async unmute() {
        await this.guild.members.unmute(this.user.id);
    }
    async untimeout() {
        await this.guild.members.untimeout(this.user.id);
    }
    toString() {
        return `<@${this.nickname ? '!' : ''}${this.user.id}>`;
    }
}
exports.default = GuildMember;
//# sourceMappingURL=GuildMember.js.map