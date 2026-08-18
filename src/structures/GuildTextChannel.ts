import { type APIGuildTextChannel, type GuildTextChannelType } from 'discord-api-types/v10';

import { BaseGuildChannel } from './BaseGuildChannel';
import { type Client } from './Client';

export class GuildTextChannel extends BaseGuildChannel {
  public nsfw: boolean;
  public topic: string | null;

  public constructor(client: Client<true>, guildId: string, data: APIGuildTextChannel<GuildTextChannelType>) {
    super(client, guildId, data);

    this.nsfw = data.nsfw ?? false;
    this.topic = data.topic ?? null;
  }
}
