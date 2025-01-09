import Channel from './Channel';
import Client from './Client';
import Emoji from './Emoji';
import Guild from './Guild';
import GuildBan from './GuildBan';
import GuildMember from './GuildMember';
import GuildRole from './GuildRole';
import Message from './Message';
import Presence from './Presence';
import Sticker from './Sticker';
import User from './User';

import Collection from '../util/Collection';

export type Events = {
    'ChannelCreate': [channel: Channel];
    'ChannelDelete': [channel: Channel];
    'ChannelUpdate': [oldChannel: Channel, newChannel: Channel];
    'GuildBanAdd': [ban: GuildBan];
    'GuildBanRemove': [ban: GuildBan];
    'GuildCreate': [guild: Guild];
    'GuildDelete': [guild: Guild];
    'GuildEmojisUpdate': [emojis: Collection<string, Emoji>];
    'GuildMemberAdd': [member: GuildMember];
    'GuildMemberRemove': [member: GuildMember];
    'GuildMemberUpdate': [oldMember: GuildMember, newMember: GuildMember];
    'GuildRoleCreate': [role: GuildRole];
    'GuildRoleDelete': [role: GuildRole];
    'GuildRoleUpdate': [oldRole: GuildRole, newRole: GuildRole];
    'GuildStickersUpdate': [stickers: Collection<string, Sticker>];
    'GuildUpdate': [oldGuild: Guild, newGuild: Guild];
    'MessageCreate': [message: Message];
    'MessageDelete': [message: Message];
    'MessageUpdate': [oldMessage: Message, newMessage: Message];
    'PresenceUpdate': [oldPresence: Presence, newPresence: Presence];
    'Ready': [client: Client];
    'UserUpdate': [oldUser: User, newUser: User];
};
export type EventOptions<K extends keyof Events> = {
    name: K;
    run: (...args: Events[K]) => void;
};

export default class Event<K extends keyof Events = keyof Events> {
    public name: EventOptions<K>['name'];
    public run: EventOptions<K>['run'];

    constructor(options: EventOptions<K>) {
        const { name, run } = options;

        this.name = name;
        this.run = run;
    }
}