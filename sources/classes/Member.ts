import types from 'discord-api-types/v10';
import Client from './Client';
import MemberFlags, { MemberFlag } from '../util/MemberFlags';
import Guild from './Guild';
import Permissions, { Permission } from '../util/Permissions';
import Presence from './Presence';
import User from './User';
import Collection from '../util/Collection';
import Role from './Role';

export default class Member {
    private client: Client;
    private guildId!: string;

    avatar?: string;
    boosting?: {
        since: Date;
        timestamp: number;
    };
    deaf: boolean;
    flags: MemberFlag[];
    joined: {
        at: Date;
        timestamp: number;
    };
    mute: boolean;
    nickname?: string;
    presence: Presence;
    user: User;
    roles = new Collection<string, Role>();

    constructor (
        client: Client,
        data: types.APIGuildMember | types.GatewayGuildMemberAddDispatchData | types.GatewayGuildMemberUpdateDispatchData,
        guild: Guild,
        presence: Presence
    ) {
        this.avatar = data.avatar || undefined;
        this.boosting = data.premium_since ? {
            since: new Date(Date.parse(data.premium_since)),
            timestamp: Date.parse(data.premium_since)
        } : undefined;
        this.client = client;
        this.deaf = !!data.deaf;
        this.flags = new MemberFlags(data.flags).toArray() as MemberFlag[];
        this.guildId = guild.id;

        const joined = Date.parse(data.joined_at!);

        this.joined = {
            at: new Date(joined),
            timestamp: joined
        };
        this.mute = !!data.mute;
        this.nickname = data.nick || undefined;
        this.presence = presence;

        guild.roles.forEach((role) => data.roles.includes(role.id) && this.roles.set(role.id, role));

        this.user = new User(data.user);

        client.users.set(this.user.id, this.user);

        Object.defineProperties(this, {
            client: { enumerable: false },
            guildId: { enumerable: false },
            roles: { enumerable: false }
        });
    }

    get guild() {
        return this.client.guilds.get(this.guildId)!;
    }

    get permissions() {
        let bitField = BigInt(0);

        this.roles.forEach((role) => {
            bitField |= BigInt(role.permissions.reduce((previous, current) => previous | Permissions.bits[current], 0));
        });

        return new Permissions(bitField).toArray() as Permission[];
    }
}