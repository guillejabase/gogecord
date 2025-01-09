import {
    type APIGuildMember,
    CDNRoutes,
    type GatewayGuildMemberAddDispatchData,
    type GatewayGuildMemberUpdateDispatchData,
    type GuildMemberAvatarFormat,
    RouteBases
} from 'discord-api-types/v10';

import GuildMemberRoleManager from '../managers/GuildMemberRoleManager';

import Guild from './Guild';
import Presence from './Presence';
import User from './User';

import GuildMemberFlags from '../util/GuildMemberFlags';
import type { ImageFormat, ImageSize } from '../util/Image';
import Permissions from '../util/Permissions';

type APIFullGuildMember = (
    | APIGuildMember
    | GatewayGuildMemberAddDispatchData
    | GatewayGuildMemberUpdateDispatchData
) & {
    presence?: Presence;
};

export default class GuildMember {
    public avatar?: string;
    public boosting: {
        since?: Date;
        timestamp?: number;
    };
    public deaf: boolean;
    public flags: GuildMemberFlags;
    public joined: {
        at: Date;
        timestamp: number;
    };
    public muted: boolean;
    public nickname?: string;
    public permissions: Permissions;
    public presence: Presence;
    public timedOut: {
        until?: Date;
        timestamp?: number;
    };
    public user: User;

    public roles = new GuildMemberRoleManager(this);

    constructor(public guild: Guild, data: APIFullGuildMember) {
        this.avatar = data.avatar || undefined;

        const boosting = Date.parse(data.premium_since!);
        this.boosting = {
            since: data.premium_since ? new Date(boosting) : undefined,
            timestamp: boosting || undefined
        };

        this.deaf = !!data.deaf;
        this.flags = new GuildMemberFlags(data.flags!);

        const joined = Date.parse(data.joined_at!);
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

        this.permissions = new Permissions(bitField);
        this.presence = data.presence || new Presence();

        const parsed = Date.parse(data.communication_disabled_until!);
        const timeout = parsed > Date.now() ? parsed : undefined;
        this.timedOut = {
            until: timeout ? new Date(timeout) : undefined,
            timestamp: timeout
        };

        this.user = new User(guild.client, data.user);

        guild.members.cache.set(this.user.id, this);
        guild.client.users.cache.set(this.user.id, this.user);

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false },
            roles: { enumerable: false }
        });
    }

    public avatarURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined {
        if (!this.avatar) {
            return undefined;
        }

        options.format = options.format || (this.avatar.startsWith('a_') ? 'gif' : 'png');

        return RouteBases.cdn +
            CDNRoutes.guildMemberAvatar(this.guild.id, this.user.id, this.avatar, options.format as GuildMemberAvatarFormat) +
            (options.size ? `?size=${options.size}` : '');
    }
    public async deafen(reason?: string): Promise<void> {
        await this.guild.members.deafen(this.user.id, reason);
    }
    public async mute(reason?: string): Promise<void> {
        await this.guild.members.mute(this.user.id, reason);
    }
    public async kick(reason?: string): Promise<void> {
        await this.guild.members.kick(this.user.id, reason);
    }
    public async timeout(time?: number, reason?: string): Promise<void> {
        await this.guild.members.timeout(this.user.id, time, reason);
    }
    public async undeafen(): Promise<void> {
        await this.guild.members.undeafen(this.user.id);
    }
    public async unmute(): Promise<void> {
        await this.guild.members.unmute(this.user.id);
    }
    public async untimeout(): Promise<void> {
        await this.guild.members.untimeout(this.user.id);
    }
    public toString(): string {
        return `<@${this.nickname ? '!' : ''}${this.user.id}>`;
    }
}