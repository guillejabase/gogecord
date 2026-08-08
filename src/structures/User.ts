import { UserPremiumType, type APIUser } from 'discord-api-types/v10';

import { type Client } from './Client';

import { Snowflake } from '../util/Snowflake';
import { UserFlags } from '../util/UserFlags';

export type PremiumType = keyof typeof UserPremiumType;

export class User {
  public accentColor?: number | null | undefined;
  public avatar: string | null;
  public banner: string | null | undefined;
  public bot?: boolean | undefined;
  public createdAt: number;
  public discriminator: string;
  public flags: UserFlags;
  public globalName: string | null;
  public id: string;
  public locale: string | undefined;
  public publicFlags: UserFlags;
  public premiumType?: PremiumType | undefined;
  public system?: boolean | undefined;
  public username: string;

  public constructor(public client: Client<true>, data: APIUser) {
    this.accentColor = data.accent_color;
    this.avatar = data.avatar;
    this.banner = data.banner;
    this.bot = data.bot;
    this.createdAt = new Snowflake(data.id).timestamp;
    this.discriminator = data.discriminator;
    this.flags = new UserFlags(data.flags);
    this.globalName = data.global_name;
    this.id = data.id;
    this.locale = data.locale;
    this.publicFlags = new UserFlags(data.public_flags);
    this.premiumType = data.premium_type ? UserPremiumType[data.premium_type] as PremiumType : undefined;
    this.system = data.system;
    this.username = data.username;

    this.client.users.set(this.id, this);
  }
}
