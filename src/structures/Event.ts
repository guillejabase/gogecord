import Client from './Client';
import Guild from './Guild';
import GuildBan from './GuildBan';
import GuildMember from './GuildMember';
import GuildRole from './GuildRole';
import Presence from './Presence';
import User from './User';

export type Events = {
    'GuildBanAdd': [ban: GuildBan];
    'GuildBanRemove': [ban: GuildBan];
    'GuildCreate': [guild: Guild];
    'GuildDelete': [guild: Guild];
    'GuildMemberAdd': [member: GuildMember];
    'GuildMemberRemove': [member: GuildMember];
    'GuildMemberUpdate': [oldMember: GuildMember, newMember: GuildMember];
    'GuildRoleCreate': [role: GuildRole];
    'GuildRoleDelete': [role: GuildRole];
    'GuildRoleUpdate': [oldRole: GuildRole, newRole: GuildRole];
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