import { APIGuildMember, GatewayGuildMemberAddDispatchData, GatewayGuildMemberUpdateDispatchData } from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import Presence from './Presence';
import User from './User';
import { Permission } from '../util/Permissions';
import MemberRoleManager from '../managers/MemberRoleManager';
export default class Member {
    avatar?: string;
    boosting: {
        since?: Date;
        timestamp?: number;
    };
    deaf: boolean;
    guild: Guild;
    joined: {
        at: Date;
        timestamp: number;
    };
    muted: boolean;
    nickname?: string;
    permissions: Permission[];
    presence: Presence;
    roles: MemberRoleManager;
    timedOut: {
        until?: Date;
        timestamp?: number;
    };
    user: User;
    constructor(client: Client, data: APIGuildMember | GatewayGuildMemberAddDispatchData | GatewayGuildMemberUpdateDispatchData, guild: Guild, presence: Presence);
}
