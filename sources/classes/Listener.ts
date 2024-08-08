import {
    GatewayChannelCreateDispatchData,
    GatewayChannelDeleteDispatchData,
    GatewayChannelUpdateDispatchData,
    GatewayGuildBanAddDispatchData,
    GatewayGuildBanRemoveDispatchData,
    GatewayGuildCreateDispatchData,
    GatewayGuildDeleteDispatchData,
    GatewayGuildMemberAddDispatchData,
    GatewayGuildMemberRemoveDispatchData,
    GatewayGuildMemberUpdateDispatchData,
    GatewayGuildRoleCreateDispatchData,
    GatewayGuildRoleDeleteDispatchData,
    GatewayGuildRoleUpdateDispatchData,
    GatewayGuildUpdateDispatchData,
    GatewayMessageCreateDispatchData,
    GatewayMessageDeleteDispatchData,
    GatewayMessageUpdateDispatchData,
    GatewayPresenceUpdateDispatchData,
    GatewayReadyDispatchData
} from 'discord-api-types/v10';

import Client from './Client';

export type Listeners = {
    BanAdd: GatewayGuildBanAddDispatchData;
    BanRemove: GatewayGuildBanRemoveDispatchData;
    ChannelCreate: GatewayChannelCreateDispatchData;
    ChannelDelete: GatewayChannelDeleteDispatchData;
    ChannelUpdate: GatewayChannelUpdateDispatchData;
    GuildCreate: GatewayGuildCreateDispatchData;
    GuildDelete: GatewayGuildDeleteDispatchData;
    GuildUpdate: GatewayGuildUpdateDispatchData;
    MemberAdd: GatewayGuildMemberAddDispatchData;
    MemberRemove: GatewayGuildMemberRemoveDispatchData;
    MemberUpdate: GatewayGuildMemberUpdateDispatchData;
    MessageCreate: GatewayMessageCreateDispatchData;
    MessageDelete: GatewayMessageDeleteDispatchData;
    MessageUpdate: GatewayMessageUpdateDispatchData;
    PresenceUpdate: GatewayPresenceUpdateDispatchData;
    Ready: GatewayReadyDispatchData;
    RoleCreate: GatewayGuildRoleCreateDispatchData;
    RoleDelete: GatewayGuildRoleDeleteDispatchData;
    RoleUpdate: GatewayGuildRoleUpdateDispatchData;
};

export const ListenersNames: {
    [key in string]: keyof Listeners;
} = {
    CHANNEL_CREATE: 'ChannelCreate',
    CHANNEL_DELETE: 'ChannelDelete',
    CHANNEL_UPDATE: 'ChannelUpdate',
    GUILD_BAN_ADD: 'BanAdd',
    GUILD_BAN_REMOVE: 'BanRemove',
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

export default class Listener<key extends keyof Listeners = keyof Listeners> {
    public name!: key;

    public run!: (client: Client, data: Listeners[key]) => void;

    constructor (options: Listener<key>) {
        Object.assign(this, options);
    }
}