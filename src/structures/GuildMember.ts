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

  public avatar?: string | null | undefined;
  public communicationDisabledUntil?: string | null | undefined;
  public deaf?: boolean | undefined;
  public flags: GuildMemberFlags;
  public joinedAt: string | null;
  public mute?: boolean | undefined;
  public nick?: string | null | undefined;
  public pending?: boolean | undefined;
  public premiumSince?: string | null | undefined;

  public roles = new Map<string, GuildRole>();

  public constructor(public client: Client<true>, private guildId: string, data: APIGuildMember | GatewayGuildMemberAddDispatchData | GatewayGuildMemberUpdateDispatchData) {
    this.avatar = data.avatar;
    this.communicationDisabledUntil = data.communication_disabled_until;
    this.deaf = data.deaf;
    this.flags = new GuildMemberFlags(data.flags);
    this.joinedAt = data.joined_at;
    this.mute = data.mute;
    this.nick = data.nick;
    this.pending = data.pending;
    this.premiumSince = data.premium_since;
    this.userId = data.user.id;

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
