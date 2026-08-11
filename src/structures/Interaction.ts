import { InteractionResponseType, MessageFlags, type APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';

import { type Client } from './Client';
import { type Guild } from './Guild';
import { type GuildMember } from './GuildMember';
import { type User } from './User';

import { InteractionOptions } from '../util/InteractionOptions';
import { Snowflake } from '../util/Snowflake';

export interface ReplyOptions {
  content: string;
  ephemeral?: boolean;
}

export class Interaction {
  private guildId: string;

  public commandName: string;
  public createdTimestamp: number;
  public id: string;
  public member: GuildMember;
  public options: InteractionOptions;
  public token: string;
  public user: User;

  public deferred = false;
  public replied = false;

  public constructor(public client: Client<true>, data: APIChatInputApplicationCommandInteraction) {
    if (!data.guild_id || !data.member) {
      throw new Error('Gogecord only supports Guild interactions.');
    }

    this.guildId = data.guild_id;

    this.commandName = data.data.name;
    this.createdTimestamp = new Snowflake(data.id).timestamp;
    this.id = data.id;
    this.options = new InteractionOptions(data.data.options);
    this.token = data.token;

    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache for interaction ${this.id}.`);
    }

    const member = guild.members.get(data.member.user.id);

    if (!member) {
      throw new Error(`Member ${data.member.user.id} was not found in cache for interaction ${this.id}.`);
    }

    this.member = member;
    this.user = member.user;
  }

  public get guild(): Guild {
    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache.`);
    }

    return guild;
  }

  public async deferReply(options?: Omit<ReplyOptions, 'content'>): Promise<void> {
    if (this.replied || this.deferred) {
      throw new Error('Interaction has already been replied or deferred.');
    }

    const flags = options?.ephemeral ? MessageFlags.Ephemeral : undefined;

    await this.client.request({
      method: 'POST',
      endpoint: `/interactions/${this.id}/${this.token}/callback`,
      body: {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
        data: { flags }
      }
    });

    this.deferred = true;
  }
  public async editReply(options: ReplyOptions): Promise<void> {
    if (!this.replied && !this.deferred) {
      throw new Error('Cannot edit a reply before replying or deferring.');
    }

    await this.client.request({
      method: 'PATCH',
      endpoint: `/webhooks/${this.client.user.id}/${this.token}/messages/@original`,
      body: {
        content: options.content
      }
    });
  }
  public async reply(options: ReplyOptions): Promise<void> {
    if (this.replied || this.deferred) {
      throw new Error('Interaction has already been replied or deferred.');
    }

    const flags = options.ephemeral ? MessageFlags.Ephemeral : undefined;

    await this.client.request({
      method: 'POST',
      endpoint: `/interactions/${this.id}/${this.token}/callback`,
      body: {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: options.content,
          flags
        }
      }
    });

    this.replied = true;
  }
}
