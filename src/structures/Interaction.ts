import { InteractionResponseType, MessageFlags, type APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';

import { type Client } from './Client';
import { type Guild } from './Guild';
import { type GuildMember } from './GuildMember';

import { type GuildChannel } from '../util/ChannelFactory';
import { InteractionOptions } from '../util/InteractionOptions';
import { Snowflake } from '../util/Snowflake';

export interface ReplyOptions {
  content: string;
  ephemeral?: boolean;
}

export class Interaction {
  private channelId: string;
  private guildId: string;
  private memberId: string;

  public commandName: string;
  public createdTimestamp: number;
  public id: string;
  public options: InteractionOptions;
  public token: string;

  public deferred = false;
  public replied = false;

  public constructor(public client: Client<true>, data: APIChatInputApplicationCommandInteraction) {
    if (!data.guild_id || !data.member) {
      throw new Error('Gogecord only supports Guild interactions.');
    }

    this.channelId = data.channel.id;
    this.guildId = data.guild_id;
    this.memberId = data.member.user.id;

    this.commandName = data.data.name;
    this.createdTimestamp = new Snowflake(data.id).timestamp;
    this.id = data.id;
    this.token = data.token;

    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache for interaction ${this.id}.`);
    }

    this.options = new InteractionOptions(guild, data.data.options);
  }

  public get channel(): GuildChannel {
    const channel = this.guild.channels.get(this.channelId);

    if (!channel) {
      throw new Error(`Channel ${this.channelId} was not found in cache.`);
    }

    return channel;
  }
  public get guild(): Guild {
    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache.`);
    }

    return guild;
  }
  public get member(): GuildMember {
    const member = this.guild.members.get(this.memberId);

    if (!member) {
      throw new Error(`Member ${this.memberId} was not found in cache.`);
    }

    return member;
  }

  public async deferReply(options?: Omit<ReplyOptions, 'content'>): Promise<void> {
    if (this.replied || this.deferred) {
      throw new Error('Interaction has already been replied or deferred.');
    }

    await this.client.request({
      method: 'POST',
      endpoint: `/interactions/${this.id}/${this.token}/callback`,
      body: {
        type: InteractionResponseType.DeferredChannelMessageWithSource,
        data: {
          flags: options?.ephemeral ? MessageFlags.Ephemeral : undefined
        }
      }
    });

    this.deferred = true;
  }
  public async deleteReply(): Promise<void> {
    if (!this.replied && !this.deferred) {
      throw new Error('Cannot delete a reply before replying or deferring.');
    }

    await this.client.request({
      method: 'DELETE',
      endpoint: `/webhooks/${this.client.user.id}/${this.token}/messages/@original`
    });
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
  public async followUp(options: ReplyOptions): Promise<void> {
    if (!this.replied && !this.deferred) {
      throw new Error('Cannot send a follow-up before replying or deferring.');
    }

    await this.client.request({
      method: 'POST',
      endpoint: `/webhooks/${this.client.user.id}/${this.token}`,
      body: {
        content: options.content,
        flags: options.ephemeral ? MessageFlags.Ephemeral : undefined
      }
    });
  }
  public async reply(options: ReplyOptions): Promise<void> {
    if (this.replied || this.deferred) {
      throw new Error('Interaction has already been replied or deferred.');
    }

    await this.client.request({
      method: 'POST',
      endpoint: `/interactions/${this.id}/${this.token}/callback`,
      body: {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: options.content,
          flags: options.ephemeral ? MessageFlags.Ephemeral : undefined
        }
      }
    });

    this.replied = true;
  }
}
