import { ApplicationCommandOptionType, type APIApplicationCommandInteractionDataOption, type APIInteractionDataResolved } from 'discord-api-types/v10';

import { Attachment } from '../structures/Attachment';
import { type Guild } from '../structures/Guild';
import { type GuildMember } from '../structures/GuildMember';
import { type GuildRole } from '../structures/GuildRole';
import { type User } from '../structures/User';

import { type GuildChannel } from './ChannelFactory';

export class InteractionOptions {
  private options: Map<string, APIApplicationCommandInteractionDataOption>;

  public constructor(private guild: Guild, options?: APIApplicationCommandInteractionDataOption[], private resolved?: APIInteractionDataResolved) {
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

  public getAttachment(name: string): Attachment | null {
    const option = this.options.get(name);

    if (!option || option.type !== ApplicationCommandOptionType.Attachment) {
      return null;
    }

    const data = this.resolved?.attachments?.[option.value];
    return data ? new Attachment(data) : null;
  }
  public getBoolean(name: string): boolean | null {
    const option = this.options.get(name);
    return option && option.type === ApplicationCommandOptionType.Boolean ? option.value : null;
  }
  public getChannel(name: string): GuildChannel | null {
    const option = this.options.get(name);

    if (!option || option.type !== ApplicationCommandOptionType.Channel) {
      return null;
    }

    return this.guild.channels.get(option.value) ?? null;
  }
  public getInteger(name: string): number | null {
    const option = this.options.get(name);
    return option && option.type === ApplicationCommandOptionType.Integer ? (option.value as number) : null;
  }
  public getMember(name: string): GuildMember | null {
    const option = this.options.get(name);

    if (!option || option.type !== ApplicationCommandOptionType.User) {
      return null;
    }

    return this.guild.members.get(option.value) ?? null;
  }
  public getNumber(name: string): number | null {
    const option = this.options.get(name);
    return option && option.type === ApplicationCommandOptionType.Number ? (option.value as number) : null;
  }
  public getRole(name: string): GuildRole | null {
    const option = this.options.get(name);

    if (!option || option.type !== ApplicationCommandOptionType.Role) {
      return null;
    }

    return this.guild.roles.get(option.value) ?? null;
  }
  public getString(name: string): string | null {
    const option = this.options.get(name);
    return option && option.type === ApplicationCommandOptionType.String ? option.value : null;
  }
  public getUser(name: string): User | null {
    const option = this.options.get(name);

    if (!option || option.type !== ApplicationCommandOptionType.User) {
      return null;
    }

    return this.guild.members.get(option.value)?.user ?? this.guild.client.users.get(option.value) ?? null;
  }
}
