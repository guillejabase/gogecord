import Ban from './Ban';
import Channel from './Channel';
import Client from './Client';
import Guild from './Guild';
import Member from './Member';
import Message from './Message';
import Presence from './Presence';
import Role from './Role';

import { IntentsResolvable } from '../util/Intents';

export type Events = {
    BanAdd: [ban: Ban];
    BanRemove: [ban: Ban];
    ChannelCreate: [channel: Channel];
    ChannelDelete: [channel: Channel];
    ChannelUpdate: [oldChannel: Channel, newChannel: Channel];
    GuildCreate: [guild: Guild];
    GuildDelete: [guild: Guild];
    GuildUpdate: [oldGuild: Guild, newGuild: Guild];
    MemberAdd: [member: Member];
    MemberRemove: [member: Member];
    MemberUpdate: [oldMember: Member, newMember: Member];
    MessageCreate: [message: Message];
    MessageDelete: [message: Message];
    MessageUpdate: [oldMessage: Message, newMessage: Message];
    PresenceUpdate: [oldPresence: Presence, newPresence: Presence];
    Ready: [];
    RoleCreate: [role: Role];
    RoleDelete: [role: Role];
    RoleUpdate: [oldRole: Role, newRole: Role];
};

export const EventsIntents: {
    [key in keyof Events]: IntentsResolvable;
} = {
    BanAdd: ['GuildBans'],
    BanRemove: ['GuildBans'],
    ChannelCreate: ['Guilds'],
    ChannelDelete: ['Guilds'],
    ChannelUpdate: ['Guilds'],
    GuildCreate: ['Guilds'],
    GuildDelete: ['Guilds'],
    GuildUpdate: ['Guilds'],
    MemberAdd: ['GuildMembers'],
    MemberRemove: ['GuildMembers'],
    MemberUpdate: ['GuildMembers'],
    MessageCreate: ['GuildMessages'],
    MessageDelete: ['GuildMessages'],
    MessageUpdate: ['GuildMessages'],
    PresenceUpdate: ['GuildPresences'],
    Ready: [],
    RoleCreate: ['Guilds'],
    RoleDelete: ['Guilds'],
    RoleUpdate: ['Guilds']
};

export default class Event<key extends keyof Events = keyof Events> {
    public name!: key;

    public run!: (client: Client, ...args: Events[key]) => void;

    constructor (options: Event<key>) {
        Object.assign(this, options);
    }
}