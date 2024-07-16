import types from 'discord-api-types/v10';
import Collection from '../util/Collection';
import Channel from './Channel';
import Member from './Member';
import Role from './Role';
import Client from './Client';
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
type Feature = keyof typeof Features;
type MFALevel = keyof typeof MFALevels;
type NSFWLevel = keyof typeof NSFWLevels;
type PremiumTier = keyof typeof PremiumTiers;
export default class Guild {
    private ownerId;
    banner?: string;
    created: {
        at: Date;
        timestamp: number;
    };
    description?: string;
    features: Feature[];
    id: string;
    mfaLevel: MFALevel;
    name: string;
    nsfwLevel: NSFWLevel;
    icon?: string;
    premium: {
        subscriptions: number;
        tier: PremiumTier;
    };
    channels: Collection<string, Channel>;
    members: Collection<string, Member>;
    roles: Collection<string, Role>;
    constructor(client: Client, data: types.GatewayGuildCreateDispatchData | types.APIGuild);
    get owner(): Member | undefined;
}
export {};
