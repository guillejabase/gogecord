import { type GatewayGuildCreateDispatchData, type GatewayGuildUpdateDispatchData } from 'discord-api-types/v10';
import GuildBanManager from '../managers/GuildBanManager';
import GuildMemberManager from '../managers/GuildMemberManager';
import GuildRoleManager from '../managers/GuildRoleManager';
import Client from './Client';
import GuildMember from './GuildMember';
import type { ImageFormat, ImageSize } from '../util/Image';
export declare enum GuildExplicitContentFilters {
    Disabled = 0,
    MembersWithoutRoles = 1,
    AllMembers = 2
}
export declare enum GuildFeatures {
    AnimatedBanner = "ANIMATED_BANNER",
    AnimatedIcon = "ANIMATED_ICON",
    ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
    AutoModeration = "AUTO_MODERATION",
    Banner = "BANNER",
    Community = "COMMUNITY",
    CreatorMonetizableProvisional = "CREATOR_MONETIZABLE_PROVISIONAL",
    CreatorStorePage = "CREATOR_STORE_PAGE",
    DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
    Discoverable = "DISCOVERABLE",
    Featurable = "FEATURABLE",
    HasDirectoryEntry = "HAS_DIRECTORY_ENTRY",
    Hub = "HUB",
    InvitesDisabled = "INVITES_DISABLED",
    InviteSplash = "INVITE_SPLASH",
    LinkedToHub = "LINKED_TO_HUB",
    MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
    MoreSoundboard = "MORE_SOUNDBOARD",
    MonetizationEnabled = "MONETIZATION_ENABLED",
    MoreStickers = "MORE_STICKERS",
    News = "NEWS",
    Partnered = "PARTNERED",
    PreviewEnabled = "PREVIEW_ENABLED",
    PrivateThreads = "PRIVATE_THREADS",
    RaidAlertsDisabled = "RAID_ALERTS_DISABLED",
    RelayEnabled = "RELAY_ENABLED",
    RoleIcons = "ROLE_ICONS",
    RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
    Soundboard = "SOUNDBOARD",
    TicketedEventsEnabled = "TICKETED_EVENTS_ENABLED",
    VanityURL = "VANITY_URL",
    Verified = "VERIFIED",
    VIPRegions = "VIP_REGIONS",
    WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED"
}
export declare enum GuildLocales {
    Indonesian = "id",
    EnglishUS = "en-US",
    EnglishGB = "en-GB",
    Bulgarian = "bg",
    ChineseCN = "zh-CN",
    ChineseTW = "zh-TW",
    Croatian = "hr",
    Czech = "cs",
    Danish = "da",
    Dutch = "nl",
    Finnish = "fi",
    French = "fr",
    German = "de",
    Greek = "el",
    Hindi = "hi",
    Hungarian = "hu",
    Italian = "it",
    Japanese = "ja",
    Korean = "ko",
    Lithuanian = "lt",
    Norwegian = "no",
    Polish = "pl",
    PortugueseBR = "pt-BR",
    Romanian = "ro",
    Russian = "ru",
    SpanishES = "es-ES",
    SpanishLATAM = "es-419",
    Swedish = "sv-SE",
    Thai = "th",
    Turkish = "tr",
    Ukrainian = "uk",
    Vietnamese = "vi"
}
export declare enum GuildMFALevels {
    None = 0,
    Elevated = 1
}
export declare enum GuildNSFWLevels {
    Default = 0,
    Explicit = 1,
    Safe = 2,
    AgeRestricted = 3
}
export declare enum GuildVerificationLevels {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    VeryHigh = 4
}
export type GuildExplicitContentFilter = keyof typeof GuildExplicitContentFilters;
export type GuildFeature = keyof typeof GuildFeatures;
export type GuildLocale = keyof typeof GuildLocales;
export type GuildMFALevel = keyof typeof GuildMFALevels;
export type GuildNSFWLevel = keyof typeof GuildNSFWLevels;
export type GuildVerificationLevel = keyof typeof GuildVerificationLevels;
export default class Guild {
    client: Client;
    banner?: string;
    created: {
        at: Date;
        timestamp: number;
    };
    description?: string;
    explicitContent: GuildExplicitContentFilter;
    features: GuildFeature[];
    icon?: string;
    id: string;
    locale: GuildLocale;
    mfa: GuildMFALevel;
    name: string;
    nsfw: GuildNSFWLevel;
    owner: GuildMember;
    premium: {
        subscriptions: number;
        tier: 0 | 1 | 2 | 3;
    };
    verification: GuildVerificationLevel;
    bans: GuildBanManager;
    members: GuildMemberManager;
    roles: GuildRoleManager;
    constructor(client: Client, data: GatewayGuildCreateDispatchData | GatewayGuildUpdateDispatchData);
    bannerURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined;
    iconURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined;
}
//# sourceMappingURL=Guild.d.ts.map