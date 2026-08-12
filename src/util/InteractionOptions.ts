import { ApplicationCommandOptionType, type APIApplicationCommandInteractionDataOption } from 'discord-api-types/v10';

import { type Guild } from '../structures/Guild';
import { type GuildMember } from '../structures/GuildMember';
import { type GuildRole } from '../structures/GuildRole';
import { type User } from '../structures/User';

import { type GuildChannel } from './ChannelFactory';

export class InteractionOptions {
  private options: Map<string, APIApplicationCommandInteractionDataOption>;

  public constructor(private guild: Guild, options?: APIApplicationCommandInteractionDataOption[]) {
    this.options = new Map();

    this.resolve(options)?.forEach((o) => this.options.set(o.name, o));
  }

  private resolve(options?: APIApplicationCommandInteractionDataOption[]): APIApplicationCommandInteractionDataOption[] | undefined {
    if (!options) {
      return undefined;
    }

    const first = options[0];

    if (!first) {
      return options;
    }
    if (first.type === ApplicationCommandOptionType.SubcommandGroup && 'options' in first) {
      return this.resolve(first.options);
    }
    if (first.type === ApplicationCommandOptionType.Subcommand && 'options' in first) {
      return first.options;
    }

    return options;
  }

  public getBoolean(name: string): boolean | null {
    const options = this.options.get(name);
    return options && options.type === ApplicationCommandOptionType.Boolean ? (options.value as boolean) : null;
  }
  public getChannel(name: string): GuildChannel | null {
    const options = this.options.get(name);

    if (!options || options.type !== ApplicationCommandOptionType.Channel) {
      return null;
    }

    return this.guild.channels.get(options.value as string) ?? null;
  }
  public getInteger(name: string): number | null {
    const options = this.options.get(name);
    return options && options.type === ApplicationCommandOptionType.Integer ? (options.value as number) : null;
  }
  public getMember(name: string): GuildMember | null {
    const options = this.options.get(name);

    if (!options || options.type !== ApplicationCommandOptionType.User) {
      return null;
    }

    return this.guild.members.get(options.value as string) ?? null;
  }
  public getNumber(name: string): number | null {
    const options = this.options.get(name);
    return options && options.type === ApplicationCommandOptionType.Number ? (options.value as number) : null;
  }
  public getRole(name: string): GuildRole | null {
    const options = this.options.get(name);

    if (!options || options.type !== ApplicationCommandOptionType.Role) {
      return null;
    }

    return this.guild.roles.get(options.value as string) ?? null;
  }
  public getString(name: string): string | null {
    const options = this.options.get(name);
    return options && options.type === ApplicationCommandOptionType.String ? (options.value as string) : null;
  }
  public getUser(name: string): User | null {
    const options = this.options.get(name);

    if (!options || options.type !== ApplicationCommandOptionType.User) {
      return null;
    }

    return this.guild.members.get(options.value as string)?.user ?? this.guild.client.users.get(options.value as string) ?? null;
  }
}
