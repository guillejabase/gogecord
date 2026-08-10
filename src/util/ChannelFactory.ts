import { ChannelType, type APIGuildChannel, type GuildChannelType as Type } from 'discord-api-types/v10';

import { type Client } from '../structures/Client';
import { GuildCategoryChannel } from '../structures/GuildCategoryChannel';
import { GuildTextChannel } from '../structures/GuildTextChannel';
import { GuildVoiceChannel } from '../structures/GuildVoiceChannel';

export type GuildChannel = GuildCategoryChannel | GuildTextChannel | GuildVoiceChannel;

export class ChannelFactory {
  public static create(client: Client<true>, guildId: string, data: APIGuildChannel<Type>): GuildChannel {
    switch (data.type) {
      case ChannelType.GuildText:
      case ChannelType.GuildAnnouncement:
      case ChannelType.GuildForum:
      case ChannelType.GuildMedia:
        return new GuildTextChannel(client, guildId, data as any);
      case ChannelType.GuildVoice:
      case ChannelType.GuildStageVoice:
        return new GuildVoiceChannel(client, guildId, data as any);
      case ChannelType.GuildCategory:
        return new GuildCategoryChannel(client, guildId, data as any);
      default:
        return new GuildTextChannel(client, guildId, data as any);
    }
  }
}
