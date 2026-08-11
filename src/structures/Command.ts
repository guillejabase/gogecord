import { ApplicationCommandType, InteractionContextType, type RESTPostAPIChatInputApplicationCommandsJSONBody, type RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

import { type Interaction } from './Interaction';

export type CommandData = Omit<RESTPostAPIChatInputApplicationCommandsJSONBody, 'type' | 'contexts'>;

export interface CommandOptions {
  data: CommandData;
  run: (interaction: Interaction) => Promise<unknown> | unknown;
}

export class Command {
  public data: RESTPostAPIApplicationCommandsJSONBody;
  public run: (interaction: Interaction) => Promise<unknown> | unknown;

  public constructor(options: CommandOptions) {
    this.data = {
      ...options.data,
      type: ApplicationCommandType.ChatInput,
      contexts: [InteractionContextType.Guild]
    };
    this.run = options.run;
  }
}
