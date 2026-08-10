import { PermissionFlagsBits, PresenceUpdateStatus, type APIGuildMember, type GatewayGuildMemberAddDispatchData, type GatewayGuildMemberUpdateDispatchData } from 'discord-api-types/v10';

import { type Client } from './Client';
import { type Guild } from './Guild';
import { type GuildRole } from './GuildRole';
import { Presence } from './Presence';
import { User } from './User';

import { GuildMemberFlags } from '../util/GuildMemberFlags';
import { Permissions } from '../util/Permissions';

export class GuildMember {
  private userId: string;

  public avatar: string | null;
  public deaf: boolean;
  public flags: GuildMemberFlags;
  public joined: number | null;
  public mute: boolean;
  public nick: string | null;
  public pending: boolean;
  public premiumSince: number | null;
  public timedOutUntil: number | null;

  public roles = new Map<string, GuildRole>();

  public constructor(public client: Client<true>, private guildId: string, data: APIGuildMember | GatewayGuildMemberAddDispatchData | GatewayGuildMemberUpdateDispatchData) {
    this.userId = data.user.id;

    this.avatar = data.avatar ?? null;
    this.deaf = data.deaf ?? false;
    this.flags = new GuildMemberFlags(data.flags);
    this.joined = data.joined_at ? Date.parse(data.joined_at) : null;
    this.mute = data.mute ?? false;
    this.nick = data.nick ?? null;
    this.pending = data.pending ?? false;
    this.premiumSince = data.premium_since ? Date.parse(data.premium_since) : null;
    this.timedOutUntil = data.communication_disabled_until ? Date.parse(data.communication_disabled_until) : null;

    if (!this.client.users.has(this.userId)) {
      new User(this.client, data.user);
    }

    data.roles.forEach((id) => {
      const role = this.guild.roles.get(id);

      if (!role) return;

      this.roles.set(role.id, role);
    });

    this.guild.members.set(this.user.id, this);
  }

  public get guild(): Guild {
    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache.`);
    }

    return guild;
  }
  public get permissions(): Permissions {
    if (this.guild.owner.user.id === this.user.id) {
      return new Permissions(PermissionFlagsBits.Administrator);
    }

    const everyone = this.roles.get(this.guild.id);
    let bits = everyone ? everyone.permissions.bitField : 0n;

    for (const role of this.roles.values()) {
      bits |= role.permissions.bitField;
    }

    if ((bits & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator) {
      return new Permissions(Permissions.All);
    }

    return new Permissions(bits);
  }
  public get presence(): Presence {
    return this.client.presences.get(this.userId) ?? new Presence(this.client, {
      activities: [],
      client_status: {},
      guild_id: this.guildId,
      status: PresenceUpdateStatus.Offline,
      user: { id: this.userId }
    });
  }
  public get user(): User {
    const user = this.client.users.get(this.userId);

    if (!user) {
      throw new Error(`User ${this.userId} was not found in cache.`);
    }

    return user;
  }
}
