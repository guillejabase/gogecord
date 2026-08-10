import { type APIGuildCategoryChannel } from 'discord-api-types/v10';

import { BaseGuildChannel } from './BaseGuildChannel';
import { type Client } from './Client';

export class GuildCategoryChannel extends BaseGuildChannel {
  public constructor(client: Client<true>, guildId: string, data: APIGuildCategoryChannel) {
    super(client, guildId, data);
  }
}
