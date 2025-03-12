import {
    CDNRoutes,
    type GatewayGuildCreateDispatchData,
    type GatewayGuildUpdateDispatchData,
    type GuildBannerFormat,
    type GuildIconFormat,
    RouteBases,
} from 'discord-api-types/v10';

import GuildBanManager from '../managers/GuildBanManager';
import GuildChannelManager from '../managers/GuildChannelManager';
import GuildEmojiManager from '../managers/GuildEmojiManager';
import GuildMemberManager from '../managers/GuildMemberManager';
import GuildRoleManager from '../managers/GuildRoleManager';
import GuildStickerManager from '../managers/GuildStickerManager';

import Client from './Client';
import GuildMember from './GuildMember';
import GuildRole from './GuildRole';
import Presence from './Presence';

import type { ImageFormat, ImageSize } from '../util/Image';
import Snowflake from '../util/Snowflake';

export enum GuildExplicitContentFilters {
    Disabled = 0,
    MembersWithoutRoles = 1,
    AllMembers = 2
}
export enum GuildFeatures {
    AnimatedBanner = 'ANIMATED_BANNER',
    AnimatedIcon = 'ANIMATED_ICON',
    ApplicationCommandPermissionsV2 = 'APPLICATION_COMMAND_PERMISSIONS_V2',
    AutoModeration = 'AUTO_MODERATION',
    Banner = 'BANNER',
    Community = 'COMMUNITY',
    CreatorMonetizableProvisional = 'CREATOR_MONETIZABLE_PROVISIONAL',
    CreatorStorePage = 'CREATOR_STORE_PAGE',
    DeveloperSupportServer = 'DEVELOPER_SUPPORT_SERVER',
    Discoverable = 'DISCOVERABLE',
    Featurable = 'FEATURABLE',
    HasDirectoryEntry = 'HAS_DIRECTORY_ENTRY',
    Hub = 'HUB',
    InvitesDisabled = 'INVITES_DISABLED',
    InviteSplash = 'INVITE_SPLASH',
    LinkedToHub = 'LINKED_TO_HUB',
    MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',
    MoreSoundboard = 'MORE_SOUNDBOARD',
    MonetizationEnabled = 'MONETIZATION_ENABLED',
    MoreStickers = 'MORE_STICKERS',
    News = 'NEWS',
    Partnered = 'PARTNERED',
    PreviewEnabled = 'PREVIEW_ENABLED',
    PrivateThreads = 'PRIVATE_THREADS',
    RaidAlertsDisabled = 'RAID_ALERTS_DISABLED',
    RelayEnabled = 'RELAY_ENABLED',
    RoleIcons = 'ROLE_ICONS',
    RoleSubscriptionsAvailableForPurchase = 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE',
    RoleSubscriptionsEnabled = 'ROLE_SUBSCRIPTIONS_ENABLED',
    Soundboard = 'SOUNDBOARD',
    TicketedEventsEnabled = 'TICKETED_EVENTS_ENABLED',
    VanityURL = 'VANITY_URL',
    Verified = 'VERIFIED',
    VIPRegions = 'VIP_REGIONS',
    WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED'
}
export enum GuildLocales {
    Indonesian = 'id',
    EnglishUS = 'en-US',
    EnglishGB = 'en-GB',
    Bulgarian = 'bg',
    ChineseCN = 'zh-CN',
    ChineseTW = 'zh-TW',
    Croatian = 'hr',
    Czech = 'cs',
    Danish = 'da',
    Dutch = 'nl',
    Finnish = 'fi',
    French = 'fr',
    German = 'de',
    Greek = 'el',
    Hindi = 'hi',
    Hungarian = 'hu',
    Italian = 'it',
    Japanese = 'ja',
    Korean = 'ko',
    Lithuanian = 'lt',
    Norwegian = 'no',
    Polish = 'pl',
    PortugueseBR = 'pt-BR',
    Romanian = 'ro',
    Russian = 'ru',
    SpanishES = 'es-ES',
    SpanishLATAM = 'es-419',
    Swedish = 'sv-SE',
    Thai = 'th',
    Turkish = 'tr',
    Ukrainian = 'uk',
    Vietnamese = 'vi'
}
export enum GuildMFALevels {
    None = 0,
    Elevated = 1
}
export enum GuildNSFWLevels {
    Default = 0,
    Explicit = 1,
    Safe = 2,
    AgeRestricted = 3
}
export enum GuildVerificationLevels {
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
    public banner?: string;
    public created: {
        at: Date;
        timestamp: number;
    };
    public description?: string;
    public explicitContent: GuildExplicitContentFilter;
    public features: GuildFeature[];
    public icon?: string;
    public id: string;
    public locale: GuildLocale;
    public mfa: GuildMFALevel;
    public name: string;
    public nsfw: GuildNSFWLevel;
    public owner!: GuildMember;
    public premium: {
        subscriptions: number;
        tier: 0 | 1 | 2 | 3;
    };
    public verification: GuildVerificationLevel;

    public bans = new GuildBanManager(this);
    public channels = new GuildChannelManager(this);
    public emojis = new GuildEmojiManager(this);
    public members = new GuildMemberManager(this);
    public roles = new GuildRoleManager(this);
    public stickers = new GuildStickerManager(this);

    public constructor(public client: Client, data: GatewayGuildCreateDispatchData | GatewayGuildUpdateDispatchData) {
        this.banner = data.banner || undefined;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };

        this.description = data.description || undefined;
        this.explicitContent = Object
            .keys(GuildExplicitContentFilters)
            .find((key) => {
                return GuildExplicitContentFilters[key as GuildExplicitContentFilter] as number === data.explicit_content_filter;
            }) as GuildExplicitContentFilter;
        this.features = data.features
            .map((feature) => Object
                .keys(GuildFeatures)
                .find((key) => {
                    return GuildFeatures[key as GuildFeature] as string === feature;
                }) as GuildFeature)
            .filter((feature) => feature != undefined)
            .sort();
        this.icon = data.icon || undefined;
        this.locale = Object
            .keys(GuildLocales)
            .find((key) => {
                return GuildLocales[key as GuildLocale] as string === data.preferred_locale;
            }) as GuildLocale;
        this.mfa = Object
            .keys(GuildMFALevels)
            .find((key) => {
                return GuildMFALevels[key as GuildMFALevel] as number === data.mfa_level;
            }) as GuildMFALevel;
        this.name = data.name;
        this.nsfw = Object
            .keys(GuildNSFWLevels)
            .find((key) => {
                return GuildNSFWLevels[key as GuildNSFWLevel] as number === data.nsfw_level;
            }) as GuildNSFWLevel;

        const length = Math.max(
            ...data.roles
                .filter((roleData) => {
                    return roleData.id !== this.id;
                })
                .map((roleData) => {
                    return roleData.position;
                })
        );

        for (const apiRole of data.roles.filter((roleData) => roleData.id === this.id).sort()) {
            new GuildRole(this, {
                ...apiRole,
                position: length - apiRole.position + 1
            });
        }

        this.roles.everyone = new GuildRole(this, {
            ...data.roles.find((roleData) => {
                return roleData.id === this.id;
            })!,
            position: data.roles.length
        });

        if ('members' in data) {
            for (const apiMember of data.members) {
                const member = new GuildMember(this, {
                    ...apiMember,
                    presence: new Presence(data.presences.find((apiPresence) => {
                        return apiMember.user.id === apiPresence.user.id;
                    }))
                });

                this.roles.cache.forEach((role) => {
                    if (!member.roles.cache.has(role.id)) {
                        return;
                    }

                    role.members.set(member.user.id, member);
                });
            }

            this.owner = this.members.cache.get(data.owner_id)!;
        }

        this.premium = {
            subscriptions: data.premium_subscription_count || 0,
            tier: data.premium_tier
        };
        this.verification = Object
            .keys(GuildVerificationLevels)
            .find((key) => {
                return GuildVerificationLevels[key as GuildVerificationLevel] as number === data.verification_level;
            }) as GuildVerificationLevel;

        client.guilds.cache.set(this.id, this);

        Object.defineProperties(this, {
            bans: { enumerable: false },
            channels: { enumerable: false },
            client: { enumerable: false },
            members: { enumerable: false },
            roles: { enumerable: false }
        });
        Object.defineProperty(this.owner, 'guild', { enumerable: false });
    }

    public bannerURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined {
        if (!this.banner) {
            return undefined;
        }

        options.format = options.format || (this.banner.startsWith('a_') ? 'gif' : 'png');

        return RouteBases.cdn +
            CDNRoutes.guildBanner(this.id, this.banner, options.format as GuildBannerFormat) +
            (options.size ? `?size=${options.size}` : '');
    }
    public iconURL(options: {
        format?: ImageFormat;
        size?: ImageSize;
    }): string | undefined {
        if (!this.icon) {
            return undefined;
        }

        options.format = options.format || (this.icon.startsWith('a_') ? 'gif' : 'png');

        return RouteBases.cdn +
            CDNRoutes.guildIcon(this.id, this.icon, options.format as GuildIconFormat) +
            options.size ? `?size=${options.size}` : '';
    }
}