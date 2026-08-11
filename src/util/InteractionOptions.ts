import { ApplicationCommandOptionType, type APIApplicationCommandInteractionDataOption } from 'discord-api-types/v10';

export class InteractionOptions {
  private options: Map<string, APIApplicationCommandInteractionDataOption>;

  public constructor(options?: APIApplicationCommandInteractionDataOption[]) {
    this.options = new Map();
    options?.forEach((opt) => this.options.set(opt.name, opt));
  }

  public getBoolean(name: string): boolean | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.Boolean ? (opt.value as boolean) : null;
  }

  public getChannel(name: string): string | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.Channel ? (opt.value as string) : null;
  }

  public getInteger(name: string): number | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.Integer ? (opt.value as number) : null;
  }

  public getNumber(name: string): number | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.Number ? (opt.value as number) : null;
  }

  public getRole(name: string): string | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.Role ? (opt.value as string) : null;
  }

  public getString(name: string): string | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.String ? (opt.value as string) : null;
  }

  public getUser(name: string): string | null {
    const opt = this.options.get(name);
    return opt && opt.type === ApplicationCommandOptionType.User ? (opt.value as string) : null;
  }
}
