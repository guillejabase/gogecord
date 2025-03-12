import Channel from './BasedChannel';
import Client from './Client';
import Emoji from './Emoji';
import Guild from './Guild';
import GuildBan from './GuildBan';
import GuildMember from './GuildMember';
import GuildRole from './GuildRole';
import Message from './BasedMessage';
import Presence from './Presence';
import Sticker from './Sticker';
import User from './User';

import Collection from '../util/Collection';

export type Events = {
    CHANNEL_CREATE: [channel: Channel];
    CHANNEL_DELETE: [channel: Channel];
    CHANNEL_UPDATE: [oldChannel: Channel, newChannel: Channel];
    GUILD_BAN_ADD: [ban: GuildBan];
    GUILD_BAN_REMOVE: [ban: GuildBan];
    GUILD_CREATE: [guild: Guild];
    GUILD_DELETE: [guild: Guild];
    GUILD_EMOJIS_UPDATE: [emojis: Collection<string, Emoji>];
    GUILD_MEMBER_ADD: [member: GuildMember];
    GUILD_MEMBER_REMOVE: [member: GuildMember];
    GUILD_MEMBER_UPDATE: [oldMember: GuildMember, newMember: GuildMember];
    GUILD_ROLE_CREATE: [role: GuildRole];
    GUILD_ROLE_DELETE: [role: GuildRole];
    GUILD_ROLE_UPDATE: [oldRole: GuildRole, newRole: GuildRole];
    GUILD_STICKERS_UPDATE: [stickers: Collection<string, Sticker>];
    GUILD_UPDATE: [oldGuild: Guild, newGuild: Guild];
    MESSAGE_CREATE: [message: Message];
    MESSAGE_DELETE: [message: Message];
    MESSAGE_UPDATE: [oldMessage: Message, newMessage: Message];
    PRESENCE_UPDATE: [oldPresence: Presence, newPresence: Presence];
    READY: [client: Client];
    USER_UPDATE: [oldUser: User, newUser: User];
};
export type EventOptions<K extends keyof Events> = {
    name: K;
    run: (...args: Events[K]) => void;
};

export default class Event<K extends keyof Events = keyof Events> {
    public name: EventOptions<K>['name'];
    public run: EventOptions<K>['run'];

    public constructor(options: EventOptions<K>) {
        const { name, run } = options;

        this.name = name;
        this.run = run;
    }
}