import types from 'discord-api-types/v10';
import Client from './Client';
import { MemberFlag } from '../util/MemberFlags';
import Guild from './Guild';
import { Permission } from '../util/Permissions';
import Presence from './Presence';
import User from './User';
import Collection from '../util/Collection';
import Role from './Role';
export default class Member {
    private client;
    private guildId;
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
    roles: Collection<string, Role>;
    constructor(client: Client, data: types.APIGuildMember | types.GatewayGuildMemberAddDispatchData | types.GatewayGuildMemberUpdateDispatchData, guild: Guild, presence: Presence);
    get guild(): Guild;
    get permissions(): Permission[];
}
