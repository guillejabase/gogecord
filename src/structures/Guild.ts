import { GuildExplicitContentFilter, GuildFeature, GuildHubType, GuildMFALevel, GuildNSFWLevel, GuildPremiumTier, GuildVerificationLevel, type GatewayGuildCreateDispatchData, type GatewayGuildUpdateDispatchData } from 'discord-api-types/v10';

import { type Client } from './Client';
import { GuildMember } from './GuildMember';
import { GuildRole } from './GuildRole';

import { GuildSystemChannelFlags } from '../util/GuildSystemChannelFlags';
import { Snowflake } from '../util/Snowflake';

export type ExplicitContentFilter = keyof typeof GuildExplicitContentFilter;
export type Feature = keyof typeof GuildFeature;
export type HubType = keyof typeof GuildHubType;
export type MFALevel = keyof typeof GuildMFALevel;
export type NSFWLevel = keyof typeof GuildNSFWLevel;
export type PremiumTier = keyof typeof GuildPremiumTier;
export type VerificationLevel = keyof typeof GuildVerificationLevel;

export class Guild {
  private ownerId: string;

  public banner: string | null;
  public createdAt: number;
  public description: string | null;
  public explicitContentFilter: ExplicitContentFilter;
  public features: Feature[];
  public hubType: HubType | null;
  public icon: string | null;
  public id: string;
  public locale: string;
  public mfaLevel: MFALevel;
  public name: string;
  public nsfwLevel: NSFWLevel;
  public premiumTier: PremiumTier;
  public systemChannelFlags: GuildSystemChannelFlags;
  public verificationLevel: VerificationLevel;

  public members: Map<string, GuildMember>;
  public roles: Map<string, GuildRole>;

  public constructor(public client: Client<true>, data: GatewayGuildCreateDispatchData | GatewayGuildUpdateDispatchData) {
    this.ownerId = data.owner_id;

    this.banner = data.banner;
    this.createdAt = new Snowflake(data.id).timestamp;
    this.description = data.description;
    this.explicitContentFilter = GuildExplicitContentFilter[data.explicit_content_filter] as ExplicitContentFilter;
    this.features = data.features.map((f) => GuildFeature[f] as Feature);
    this.hubType = data.hub_type ? GuildHubType[data.hub_type] as HubType : null;
    this.icon = data.icon;
    this.id = data.id;
    this.locale = data.preferred_locale;
    this.mfaLevel = GuildMFALevel[data.mfa_level] as MFALevel;
    this.name = data.name;
    this.nsfwLevel = GuildNSFWLevel[data.nsfw_level] as NSFWLevel;
    this.premiumTier = GuildPremiumTier[data.premium_tier] as PremiumTier;
    this.systemChannelFlags = new GuildSystemChannelFlags(data.system_channel_flags);
    this.verificationLevel = GuildVerificationLevel[data.verification_level] as VerificationLevel;

    this.members = client.guilds.get(this.id)?.members ?? new Map<string, GuildMember>();
    this.roles = client.guilds.get(this.id)?.roles ?? new Map<string, GuildRole>();

    this.client.guilds.set(this.id, this);

    if ('members' in data) {
      data.members.forEach((m) => {
        this.members.set(m.user.id, new GuildMember(client, this.id, m));
      });
    }

    data.roles.forEach((r) => {
      this.roles.set(r.id, new GuildRole(client, this.id, r));
    });
  }

  public get owner(): GuildMember {
    const owner = this.members.get(this.ownerId);

    if (!owner) {
      throw new Error(`Owner ${this.ownerId} is not cached in guild ${this.id}.`);
    }

    return owner;
  }
}
