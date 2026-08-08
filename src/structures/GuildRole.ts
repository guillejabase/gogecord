import { type APIRole } from 'discord-api-types/v10';

import { type Client } from './Client';
import { type Guild } from './Guild';

import { GuildRoleFlags } from '../util/GuildRoleFlags';
import { Permissions } from '../util/Permissions';
import { Snowflake } from '../util/Snowflake';

export interface GuildRoleColors {
  primary: number;
  secondary: number | null;
  tertiary: number | null;
}

export class GuildRole {
  public colors: GuildRoleColors;
  public createdAt: number;
  public flags: GuildRoleFlags;
  public hoist: boolean;
  public icon?: string | null | undefined;
  public id: string;
  public managed: boolean;
  public mentionable: boolean;
  public name: string;
  public permissions: Permissions;
  public position: number;

  public constructor(public client: Client<true>, private guildId: string, data: APIRole) {
    this.colors = {
      primary: data.colors.primary_color,
      secondary: data.colors.secondary_color,
      tertiary: data.colors.tertiary_color
    };
    this.createdAt = new Snowflake(data.id).timestamp;
    this.flags = new GuildRoleFlags(data.flags);
    this.hoist = data.hoist;
    this.icon = data.icon;
    this.id = data.id;
    this.managed = data.managed;
    this.mentionable = data.mentionable;
    this.name = data.name;
    this.permissions = new Permissions(BigInt(data.permissions));
    this.position = data.position;

    this.guild.roles.set(this.id, this);
  }

  public get guild(): Guild {
    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache.`);
    }

    return guild;
  }
}
