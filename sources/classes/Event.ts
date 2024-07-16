import types from 'discord-api-types/v10';
import Channel from './Channel';
import Client from './Client';
import Guild from './Guild';
import Member from './Member';
import Message from './Message';
import Presence from './Presence';
import Role from './Role';
import { IntentsResolvable } from '../util/Intents';

export type ClientEvents = {
    ChannelCreate: [client: Client, channel: Channel];
    ChannelDelete: [client: Client, channel: Channel];
    ChannelUpdate: [client: Client, oldChannel: Channel, newChannel: Channel];
    GuildCreate: [client: Client, guild: Guild];
    GuildDelete: [client: Client, guild: Guild];
    GuildUpdate: [client: Client, oldGuild: Guild, newGuild: Guild];
    MemberAdd: [client: Client, member: Member];
    MemberRemove: [client: Client, member: Member];
    MemberUpdate: [client: Client, oldMember: Member, newMember: Member];
    MessageCreate: [client: Client, message: Message];
    MessageDelete: [client: Client, message: Message];
    MessageUpdate: [client: Client, oldMessage: Message, newMessage: Message];
    PresenceUpdate: [client: Client, oldPresence: Presence, newPresence: Presence];
    Ready: [client: Client];
    RoleCreate: [client: Client, role: Role];
    RoleDelete: [client: Client, role: Role];
    RoleUpdate: [client: Client, oldRole: Role, newRole: Role];
};
export type GatewayEvents = {
    ChannelCreate: types.GatewayChannelCreateDispatchData,
    ChannelDelete: types.GatewayChannelDeleteDispatchData,
    ChannelUpdate: types.GatewayChannelUpdateDispatchData,
    GuildCreate: types.GatewayGuildCreateDispatchData,
    GuildDelete: types.GatewayGuildDeleteDispatchData,
    GuildUpdate: types.GatewayGuildUpdateDispatchData,
    MemberAdd: types.GatewayGuildMemberAddDispatchData,
    MemberRemove: types.GatewayGuildMemberRemoveDispatchData,
    MemberUpdate: types.GatewayGuildMemberUpdateDispatchData,
    MessageCreate: types.GatewayMessageCreateDispatchData,
    MessageDelete: types.GatewayMessageDeleteDispatchData,
    MessageUpdate: types.GatewayMessageUpdateDispatchData,
    PresenceUpdate: types.GatewayPresenceUpdateDispatchData,
    Ready: types.GatewayReadyDispatchData,
    RoleCreate: types.GatewayGuildRoleCreateDispatchData,
    RoleDelete: types.GatewayGuildRoleDeleteDispatchData,
    RoleUpdate: types.GatewayGuildRoleUpdateDispatchData;
};

export const EventsName = {
    CHANNEL_CREATE: 'ChannelCreate',
    CHANNEL_DELETE: 'ChannelDelete',
    CHANNEL_UPDATE: 'ChannelUpdate',
    GUILD_CREATE: 'GuildCreate',
    GUILD_DELETE: 'GuildDelete',
    GUILD_MEMBER_ADD: 'MemberAdd',
    GUILD_MEMBER_REMOVE: 'MemberRemove',
    GUILD_MEMBER_UPDATE: 'MemberUpdate',
    GUILD_ROLE_CREATE: 'RoleCreate',
    GUILD_ROLE_DELETE: 'RoleDelete',
    GUILD_ROLE_UPDATE: 'RoleUpdate',
    GUILD_UPDATE: 'GuildUpdate',
    MESSAGE_CREATE: 'MessageCreate',
    MESSAGE_DELETE: 'MessageDelete',
    MESSAGE_UPDATE: 'MessageUpdate',
    PRESENCE_UPDATE: 'PresenceUpdate',
    READY: 'Ready'
};
export const EventsIntents: {
    [key in keyof ClientEvents]: IntentsResolvable[]
} = {
    ChannelCreate: ['Guilds'],
    ChannelDelete: ['Guilds'],
    ChannelUpdate: ['Guilds'],
    GuildCreate: ['Guilds'],
    GuildDelete: ['Guilds'],
    GuildUpdate: ['Guilds'],
    MemberAdd: ['GuildMembers'],
    MemberRemove: ['GuildMembers'],
    MemberUpdate: ['GuildMembers'],
    MessageCreate: ['DirectMessages', 'GuildMessages'],
    MessageDelete: ['DirectMessages', 'GuildMessages'],
    MessageUpdate: ['DirectMessages', 'GuildMessages'],
    PresenceUpdate: ['GuildPresences'],
    RoleCreate: ['Guilds'],
    RoleDelete: ['Guilds'],
    RoleUpdate: ['Guilds'],
    Ready: []
};

export default class Event<key extends keyof GatewayEvents> {
    name!: key;
    run!: (client: Client, data: GatewayEvents[key]) => void;

    constructor (options: Event<key>) {
        Object.assign(this, options);
    }
}