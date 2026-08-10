import { UserPremiumType, type APIUser } from 'discord-api-types/v10';

import { type Client } from './Client';

import { Snowflake } from '../util/Snowflake';
import { UserFlags } from '../util/UserFlags';

export type PremiumType = keyof typeof UserPremiumType;

export class User {
  public accentColor: number | null;
  public avatar: string | null;
  public banner: string | null;
  public bot: boolean;
  public createdAt: number;
  public discriminator: string;
  public flags: UserFlags;
  public globalName: string | null;
  public id: string;
  public locale: string | null;
  public publicFlags: UserFlags;
  public premiumType: PremiumType;
  public system: boolean;
  public username: string;

  public constructor(public client: Client<true>, data: APIUser) {
    this.accentColor = data.accent_color ?? null;
    this.avatar = data.avatar;
    this.banner = data.banner ?? null;
    this.bot = data.bot ?? false;
    this.createdAt = new Snowflake(data.id).timestamp;
    this.discriminator = data.discriminator;
    this.flags = new UserFlags(data.flags);
    this.globalName = data.global_name;
    this.id = data.id;
    this.locale = data.locale ?? null;
    this.publicFlags = new UserFlags(data.public_flags);
    this.premiumType = data.premium_type ? UserPremiumType[data.premium_type] as PremiumType : 'None';
    this.system = data.system ?? false;
    this.username = data.username;

    this.client.users.set(this.id, this);
  }
}
