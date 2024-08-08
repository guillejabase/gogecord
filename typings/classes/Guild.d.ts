import { GatewayGuildCreateDispatchData, GatewayGuildUpdateDispatchData } from 'discord-api-types/v10';
import Client from './Client';
import Member from './Member';
import BanManager from '../managers/BanManager';
import ChannelManager from '../managers/ChannelManager';
import MemberManager from '../managers/MemberManager';
import RoleManager from '../managers/RoleManager';
declare const Features: {
    AnimatedBanner: string;
    AnimatedIcon: string;
    ApplicationCommandPermissionsV2: string;
    AutoModeration: string;
    Banner: string;
    ChannelIconEmojisGenerated: string;
    Community: string;
    CreatorMonetizableProvisional: string;
    CreatorStorePage: string;
    DeveloperSupportServer: string;
    Discoverable: string;
    EnabledModerationExperienceForNonCommunity: string;
    Featurable: string;
    HasDirectoryEntry: string;
    InvitesDisabled: string;
    InviteSplash: string;
    MemberVerificationGateEnabled: string;
    MoreStickers: string;
    News: string;
    Partnered: string;
    PreviewEnabled: string;
    PrivateThreads: string;
    RaidAlertsDisabled: string;
    RelayEnabled: string;
    RoleIcons: string;
    RoleSubscriptionsAvailableForPurchase: string;
    RoleSubscriptionsEnabled: string;
    Soundboard: string;
    TextInVoiceEnabled: string;
    TicketedEventsEnabled: string;
    VanityURL: string;
    Verified: string;
    VIPRegions: string;
    WelcomeScreenEnabled: string;
};
declare const MFALevels: {
    None: number;
    Elevated: number;
};
declare const NSFWLevels: {
    Default: number;
    Explicit: number;
    Safe: number;
    AgeRestricte: number;
};
declare const PremiumTiers: {
    None: number;
    Tier1: number;
    Tier2: number;
    Tier3: number;
};
export type Feature = keyof typeof Features;
export type MFALevel = keyof typeof MFALevels;
export type NSFWLevel = keyof typeof NSFWLevels;
export type PremiumTier = keyof typeof PremiumTiers;
export default class Guild {
    banner?: string;
    bans: BanManager;
    channels: ChannelManager;
    created: {
        at: Date;
        timestamp: number;
    };
    description?: string;
    features: Feature[];
    icon?: string;
    id: string;
    me: Member;
    members: MemberManager;
    mfaLevel: MFALevel;
    name: string;
    nsfwLevel: NSFWLevel;
    owner: Member;
    premium: {
        subscriptions: number;
        tier: PremiumTier;
    };
    roles: RoleManager;
    constructor(client: Client, data: GatewayGuildCreateDispatchData | GatewayGuildUpdateDispatchData);
}
export {};
