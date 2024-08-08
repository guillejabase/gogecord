import {
    APIGuildMember,
    GatewayGuildMemberAddDispatchData,
    GatewayGuildMemberUpdateDispatchData
} from 'discord-api-types/v10';

import Client from './Client';
import Guild from './Guild';
import Presence from './Presence';
import User from './User';

import Permissions, { Permission } from '../util/Permissions';
import MemberRoleManager from '../managers/MemberRoleManager';

export default class Member {
    public avatar?: string;
    public boosting: {
        since?: Date;
        timestamp?: number;
    };
    public deaf: boolean;
    public guild: Guild;
    public joined: {
        at: Date;
        timestamp: number;
    };
    public muted: boolean;
    public nickname?: string;
    public permissions: Permission[];
    public presence: Presence;
    public roles: MemberRoleManager;
    public timedOut: {
        until?: Date;
        timestamp?: number;
    };
    public user: User;

    constructor (client: Client, data: APIGuildMember | GatewayGuildMemberAddDispatchData | GatewayGuildMemberUpdateDispatchData, guild: Guild, presence: Presence) {
        this.avatar = data.avatar || undefined;

        const boosting = Date.parse(data.premium_since!);

        this.boosting = {
            since: data.premium_since ? new Date(boosting) : undefined,
            timestamp: boosting || undefined
        };
        this.deaf = !!data.deaf;
        this.guild = guild;

        const joined = Date.parse(data.joined_at!);

        this.joined = {
            at: new Date(joined),
            timestamp: joined
        };
        this.muted = !!data.mute;
        this.nickname = data.nick || undefined;
        this.user = new User(data.user);
        this.roles = new MemberRoleManager(client, this);

        this.guild.roles.cache.forEach((role) => {
            if (data.roles.includes(role.id)) {
                this.roles.cache.set(role.id, role);
            };
        });

        let bitField = BigInt(0);

        this.roles.cache.forEach((role) => {
            bitField |= BigInt(role.permissions.reduce((previous, current) => previous | Permissions.bits[current], 0));
        });

        this.permissions = new Permissions(bitField).toArray() as Permission[];
        this.presence = presence;

        const parsed = Date.parse(data.communication_disabled_until!);
        const timeout = parsed > Date.now() ? parsed : undefined;

        this.timedOut = {
            until: timeout ? new Date(timeout) : undefined,
            timestamp: timeout
        };

        if (timeout) {
            setTimeout(() => {
                this.timedOut = {
                    until: undefined,
                    timestamp: undefined
                };
            }, timeout - Date.now());
        }

        Object.defineProperties(this, {
            permissions: { enumerable: false },
            roles: { enumerable: false }
        });
    }
}