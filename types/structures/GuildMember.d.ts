import { type APIGuildMember, type GatewayGuildMemberAddDispatchData, type GatewayGuildMemberUpdateDispatchData } from 'discord-api-types/v10';
import GuildMemberRoleManager from '../managers/GuildMemberRoleManager';
import Client from './Client';
import Guild from './Guild';
import Presence from './Presence';
import User from './User';
import GuildMemberFlags from '../util/GuildMemberFlags';
import type { ImageFormat, ImageSize } from '../util/Image';
import Permissions from '../util/Permissions';
type APIFullGuildMember = (APIGuildMember | GatewayGuildMemberAddDispatchData | GatewayGuildMemberUpdateDispatchData) & {
    presence?: Presence;
};
export default class GuildMember {
    client: Client;
    guild: Guild;
    avatar?: string;
    boosting: {
        since?: Date;
        timestamp?: number;
    };
    deaf: boolean;
    flags: GuildMemberFlags;
    joined: {
        at: Date;
        timestamp: number;
    };
    muted: boolean;
    nickname?: string;
    permissions: Permissions;
    presence: Presence;
    timedOut: {
        until?: Date;
        timestamp?: number;
    };
    user: User;
    roles: GuildMemberRoleManager;
    constructor(client: Client, guild: Guild, data: APIFullGuildMember);
    avatarURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined;
    deafen(reason?: string): Promise<void>;
    mute(reason?: string): Promise<void>;
    kick(reason?: string): Promise<void>;
    timeout(time?: number, reason?: string): Promise<void>;
    undeafen(): Promise<void>;
    unmute(): Promise<void>;
    untimeout(): Promise<void>;
    toString(): string;
}
export {};
//# sourceMappingURL=GuildMember.d.ts.map