import { ApplicationCommandType, InteractionType, type APIChatInputApplicationCommandInteraction, type APIInteraction } from 'discord-api-types/v10';

import { type Client } from '../structures/Client';
import { Interaction } from '../structures/Interaction';

export class InteractionFactory {
  public static create(client: Client<true>, data: APIInteraction): Interaction | null {
    if (!data.guild_id || !data.member) {
      return null;
    }
    if (data.type === InteractionType.ApplicationCommand && data.data.type === ApplicationCommandType.ChatInput) {
      return new Interaction(client, data as APIChatInputApplicationCommandInteraction);
    }

    return null;
  }
}
