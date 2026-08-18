import { ChannelType, type APIGuildChannel, type GuildChannelType as Type } from 'discord-api-types/v10';

import { type Client } from './Client';
import { type Guild } from './Guild';

import { Snowflake } from '../util/Snowflake';

export type GuildChannelType = {
  [K in keyof typeof ChannelType]: (typeof ChannelType)[K] extends Type ? K : never;
}[keyof typeof ChannelType];

export abstract class BaseGuildChannel {
  public createdTimestamp: number;
  public id: string;
  public name: string;
  public type: GuildChannelType;

  public constructor(public client: Client<true>, private guildId: string, data: APIGuildChannel<Type>) {
    this.createdTimestamp = new Snowflake(data.id).timestamp;
    this.id = data.id;
    this.name = data.name;
    this.type = ChannelType[data.type] as GuildChannelType;

    this.guild.channels.set(this.id, this);
  }

  public get guild(): Guild {
    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache.`);
    }

    return guild;
  }
}
