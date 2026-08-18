import { type APIBan } from 'discord-api-types/v10';

import { type Client } from './Client';
import { type Guild } from './Guild';
import { User } from './User';

export class GuildBan {
  private userId: string;

  public reason: string | null;

  public constructor(public client: Client<true>, private guildId: string, data: APIBan) {
    this.userId = data.user.id;

    this.reason = data.reason;

    if (!this.client.users.has(this.userId)) {
      new User(this.client, data.user);
    }

    this.guild.bans.set(this.userId, this);
  }

  public get guild(): Guild {
    const guild = this.client.guilds.get(this.guildId);

    if (!guild) {
      throw new Error(`Guild ${this.guildId} was not found in cache.`);
    }

    return guild;
  }
  public get user(): User {
    const user = this.client.users.get(this.userId);

    if (!user) {
      throw new Error(`User ${this.userId} was not found in cache.`);
    }

    return user;
  }
}
