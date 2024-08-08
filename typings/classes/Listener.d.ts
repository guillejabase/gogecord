import { GatewayChannelCreateDispatchData, GatewayChannelDeleteDispatchData, GatewayChannelUpdateDispatchData, GatewayGuildBanAddDispatchData, GatewayGuildBanRemoveDispatchData, GatewayGuildCreateDispatchData, GatewayGuildDeleteDispatchData, GatewayGuildMemberAddDispatchData, GatewayGuildMemberRemoveDispatchData, GatewayGuildMemberUpdateDispatchData, GatewayGuildRoleCreateDispatchData, GatewayGuildRoleDeleteDispatchData, GatewayGuildRoleUpdateDispatchData, GatewayGuildUpdateDispatchData, GatewayMessageCreateDispatchData, GatewayMessageDeleteDispatchData, GatewayMessageUpdateDispatchData, GatewayPresenceUpdateDispatchData, GatewayReadyDispatchData } from 'discord-api-types/v10';
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
export declare const ListenersNames: {
    [key in string]: keyof Listeners;
};
export default class Listener<key extends keyof Listeners = keyof Listeners> {
    name: key;
    run: (client: Client, data: Listeners[key]) => void;
    constructor(options: Listener<key>);
}
