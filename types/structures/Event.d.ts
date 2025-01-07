import Client from './Client';
import Guild from './Guild';
import GuildBan from './GuildBan';
import GuildEmoji from './GuildEmoji';
import GuildMember from './GuildMember';
import GuildRole from './GuildRole';
import GuildSticker from './GuildSticker';
import Presence from './Presence';
import User from './User';
export type Events = {
    'GuildBanAdd': [ban: GuildBan];
    'GuildBanRemove': [ban: GuildBan];
    'GuildCreate': [guild: Guild];
    'GuildDelete': [guild: Guild];
    'GuildEmojisUpdate': [
        emojis: {
            created: GuildEmoji[];
            updated: GuildEmoji[];
            deleted: GuildEmoji[];
        }
    ];
    'GuildMemberAdd': [member: GuildMember];
    'GuildMemberRemove': [member: GuildMember];
    'GuildMemberUpdate': [oldMember: GuildMember, newMember: GuildMember];
    'GuildRoleCreate': [role: GuildRole];
    'GuildRoleDelete': [role: GuildRole];
    'GuildRoleUpdate': [oldRole: GuildRole, newRole: GuildRole];
    'GuildStickersUpdate': [
        stickers: {
            created: GuildSticker[];
            updated: GuildSticker[];
            deleted: GuildSticker[];
        }
    ];
    'GuildUpdate': [oldGuild: Guild, newGuild: Guild];
    'PresenceUpdate': [oldPresence: Presence, newPresence: Presence];
    'Ready': [client: Client];
    'UserUpdate': [oldUser: User, newUser: User];
};
export type EventOptions<K extends keyof Events> = {
    name: K;
    run: (...args: Events[K]) => void;
};
export default class Event<K extends keyof Events = keyof Events> {
    name: EventOptions<K>['name'];
    run: EventOptions<K>['run'];
    constructor(options: EventOptions<K>);
}
//# sourceMappingURL=Event.d.ts.map