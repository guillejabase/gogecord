import { type Client } from './Client';
import { type Guild } from './Guild';
import { type GuildMember } from './GuildMember';
import { type GuildRole } from './GuildRole';
import { type Interaction } from './Interaction';
import { type Presence } from './Presence';

import { type GuildChannel } from '../util/ChannelFactory';

export type Events = {
  CHANNEL_CREATE: [channel: GuildChannel];
  CHANNEL_DELETE: [channel: GuildChannel];
  CHANNEL_UPDATE: [old: GuildChannel, updated: GuildChannel];
  GUILD_CREATE: [guild: Guild];
  GUILD_DELETE: [guild: Guild];
  GUILD_MEMBER_ADD: [member: GuildMember];
  GUILD_MEMBER_REMOVE: [member: GuildMember];
  GUILD_MEMBER_UPDATE: [old: GuildMember, updated: GuildMember];
  GUILD_ROLE_CREATE: [role: GuildRole];
  GUILD_ROLE_DELETE: [role: GuildRole];
  GUILD_ROLE_UPDATE: [old: GuildRole, updated: GuildRole];
  GUILD_UPDATE: [old: Guild, updated: Guild];
  INTERACTION_CREATE: [interaction: Interaction];
  PRESENCE_UPDATE: [old: Presence, updated: Presence];
  READY: [client: Client<true>];
};
export type EventOptions<K extends keyof Events> = {
  name: K;
  run: (...args: Events[K]) => void;
};

export class Event<K extends keyof Events = keyof Events> {
  public name: EventOptions<K>['name'];
  public run: EventOptions<K>['run'];

  public constructor(options: EventOptions<K>) {
    const { name, run } = options;

    this.name = name;
    this.run = run;
  }
}
