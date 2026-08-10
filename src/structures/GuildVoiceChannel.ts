import { type APIGuildVoiceChannel } from 'discord-api-types/v10';

import { BaseGuildChannel } from './BaseGuildChannel';
import { type Client } from './Client';

export class GuildVoiceChannel extends BaseGuildChannel {
  public bitrate: number;
  public nsfw: boolean;

  public constructor(client: Client<true>, guildId: string, data: APIGuildVoiceChannel) {
    super(client, guildId, data);

    this.bitrate = data.bitrate ?? 64000;
    this.nsfw = data.nsfw ?? false;
  }
}
