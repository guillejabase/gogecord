"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildVerificationLevels = exports.GuildNSFWLevels = exports.GuildMFALevels = exports.GuildLocales = exports.GuildFeatures = exports.GuildExplicitContentFilters = void 0;
const v10_1 = require("discord-api-types/v10");
const GuildBanManager_1 = __importDefault(require("../managers/GuildBanManager"));
const GuildChannelManager_1 = __importDefault(require("../managers/GuildChannelManager"));
const GuildEmojiManager_1 = __importDefault(require("../managers/GuildEmojiManager"));
const GuildMemberManager_1 = __importDefault(require("../managers/GuildMemberManager"));
const GuildRoleManager_1 = __importDefault(require("../managers/GuildRoleManager"));
const GuildStickerManager_1 = __importDefault(require("../managers/GuildStickerManager"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const GuildRole_1 = __importDefault(require("./GuildRole"));
const Presence_1 = __importDefault(require("./Presence"));
const Snowflake_1 = __importDefault(require("../util/Snowflake"));
var GuildExplicitContentFilters;
(function (GuildExplicitContentFilters) {
    GuildExplicitContentFilters[GuildExplicitContentFilters["Disabled"] = 0] = "Disabled";
    GuildExplicitContentFilters[GuildExplicitContentFilters["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
    GuildExplicitContentFilters[GuildExplicitContentFilters["AllMembers"] = 2] = "AllMembers";
})(GuildExplicitContentFilters || (exports.GuildExplicitContentFilters = GuildExplicitContentFilters = {}));
var GuildFeatures;
(function (GuildFeatures) {
    GuildFeatures["AnimatedBanner"] = "ANIMATED_BANNER";
    GuildFeatures["AnimatedIcon"] = "ANIMATED_ICON";
    GuildFeatures["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
    GuildFeatures["AutoModeration"] = "AUTO_MODERATION";
    GuildFeatures["Banner"] = "BANNER";
    GuildFeatures["Community"] = "COMMUNITY";
    GuildFeatures["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
    GuildFeatures["CreatorStorePage"] = "CREATOR_STORE_PAGE";
    GuildFeatures["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
    GuildFeatures["Discoverable"] = "DISCOVERABLE";
    GuildFeatures["Featurable"] = "FEATURABLE";
    GuildFeatures["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
    GuildFeatures["Hub"] = "HUB";
    GuildFeatures["InvitesDisabled"] = "INVITES_DISABLED";
    GuildFeatures["InviteSplash"] = "INVITE_SPLASH";
    GuildFeatures["LinkedToHub"] = "LINKED_TO_HUB";
    GuildFeatures["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    GuildFeatures["MoreSoundboard"] = "MORE_SOUNDBOARD";
    GuildFeatures["MonetizationEnabled"] = "MONETIZATION_ENABLED";
    GuildFeatures["MoreStickers"] = "MORE_STICKERS";
    GuildFeatures["News"] = "NEWS";
    GuildFeatures["Partnered"] = "PARTNERED";
    GuildFeatures["PreviewEnabled"] = "PREVIEW_ENABLED";
    GuildFeatures["PrivateThreads"] = "PRIVATE_THREADS";
    GuildFeatures["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
    GuildFeatures["RelayEnabled"] = "RELAY_ENABLED";
    GuildFeatures["RoleIcons"] = "ROLE_ICONS";
    GuildFeatures["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
    GuildFeatures["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
    GuildFeatures["Soundboard"] = "SOUNDBOARD";
    GuildFeatures["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
    GuildFeatures["VanityURL"] = "VANITY_URL";
    GuildFeatures["Verified"] = "VERIFIED";
    GuildFeatures["VIPRegions"] = "VIP_REGIONS";
    GuildFeatures["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
})(GuildFeatures || (exports.GuildFeatures = GuildFeatures = {}));
var GuildLocales;
(function (GuildLocales) {
    GuildLocales["Indonesian"] = "id";
    GuildLocales["EnglishUS"] = "en-US";
    GuildLocales["EnglishGB"] = "en-GB";
    GuildLocales["Bulgarian"] = "bg";
    GuildLocales["ChineseCN"] = "zh-CN";
    GuildLocales["ChineseTW"] = "zh-TW";
    GuildLocales["Croatian"] = "hr";
    GuildLocales["Czech"] = "cs";
    GuildLocales["Danish"] = "da";
    GuildLocales["Dutch"] = "nl";
    GuildLocales["Finnish"] = "fi";
    GuildLocales["French"] = "fr";
    GuildLocales["German"] = "de";
    GuildLocales["Greek"] = "el";
    GuildLocales["Hindi"] = "hi";
    GuildLocales["Hungarian"] = "hu";
    GuildLocales["Italian"] = "it";
    GuildLocales["Japanese"] = "ja";
    GuildLocales["Korean"] = "ko";
    GuildLocales["Lithuanian"] = "lt";
    GuildLocales["Norwegian"] = "no";
    GuildLocales["Polish"] = "pl";
    GuildLocales["PortugueseBR"] = "pt-BR";
    GuildLocales["Romanian"] = "ro";
    GuildLocales["Russian"] = "ru";
    GuildLocales["SpanishES"] = "es-ES";
    GuildLocales["SpanishLATAM"] = "es-419";
    GuildLocales["Swedish"] = "sv-SE";
    GuildLocales["Thai"] = "th";
    GuildLocales["Turkish"] = "tr";
    GuildLocales["Ukrainian"] = "uk";
    GuildLocales["Vietnamese"] = "vi";
})(GuildLocales || (exports.GuildLocales = GuildLocales = {}));
var GuildMFALevels;
(function (GuildMFALevels) {
    GuildMFALevels[GuildMFALevels["None"] = 0] = "None";
    GuildMFALevels[GuildMFALevels["Elevated"] = 1] = "Elevated";
})(GuildMFALevels || (exports.GuildMFALevels = GuildMFALevels = {}));
var GuildNSFWLevels;
(function (GuildNSFWLevels) {
    GuildNSFWLevels[GuildNSFWLevels["Default"] = 0] = "Default";
    GuildNSFWLevels[GuildNSFWLevels["Explicit"] = 1] = "Explicit";
    GuildNSFWLevels[GuildNSFWLevels["Safe"] = 2] = "Safe";
    GuildNSFWLevels[GuildNSFWLevels["AgeRestricted"] = 3] = "AgeRestricted";
})(GuildNSFWLevels || (exports.GuildNSFWLevels = GuildNSFWLevels = {}));
var GuildVerificationLevels;
(function (GuildVerificationLevels) {
    GuildVerificationLevels[GuildVerificationLevels["None"] = 0] = "None";
    GuildVerificationLevels[GuildVerificationLevels["Low"] = 1] = "Low";
    GuildVerificationLevels[GuildVerificationLevels["Medium"] = 2] = "Medium";
    GuildVerificationLevels[GuildVerificationLevels["High"] = 3] = "High";
    GuildVerificationLevels[GuildVerificationLevels["VeryHigh"] = 4] = "VeryHigh";
})(GuildVerificationLevels || (exports.GuildVerificationLevels = GuildVerificationLevels = {}));
class Guild {
    client;
    banner;
    created;
    description;
    explicitContent;
    features;
    icon;
    id;
    locale;
    mfa;
    name;
    nsfw;
    owner;
    premium;
    verification;
    bans = new GuildBanManager_1.default(this);
    channels = new GuildChannelManager_1.default(this);
    emojis = new GuildEmojiManager_1.default(this);
    members = new GuildMemberManager_1.default(this);
    roles = new GuildRoleManager_1.default(this);
    stickers = new GuildStickerManager_1.default(this);
    constructor(client, data) {
        this.client = client;
        this.banner = data.banner || undefined;
        this.id = data.id;
        const created = new Snowflake_1.default(this.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.description = data.description || undefined;
        this.explicitContent = Object
            .keys(GuildExplicitContentFilters)
            .find((key) => {
            return GuildExplicitContentFilters[key] === data.explicit_content_filter;
        });
        this.features = data.features
            .map((feature) => Object
            .keys(GuildFeatures)
            .find((key) => {
            return GuildFeatures[key] === feature;
        }))
            .filter((feature) => feature != undefined)
            .sort();
        this.icon = data.icon || undefined;
        this.locale = Object
            .keys(GuildLocales)
            .find((key) => {
            return GuildLocales[key] === data.preferred_locale;
        });
        this.mfa = Object
            .keys(GuildMFALevels)
            .find((key) => {
            return GuildMFALevels[key] === data.mfa_level;
        });
        this.name = data.name;
        this.nsfw = Object
            .keys(GuildNSFWLevels)
            .find((key) => {
            return GuildNSFWLevels[key] === data.nsfw_level;
        });
        const length = Math.max(...data.roles
            .filter((roleData) => roleData.id !== this.id)
            .map((roleData) => roleData.position));
        for (const apiRole of data.roles.filter((roleData) => roleData.id === this.id).sort()) {
            new GuildRole_1.default(this, {
                ...apiRole,
                position: length - apiRole.position + 1
            });
        }
        this.roles.everyone = new GuildRole_1.default(this, {
            ...data.roles.find((roleData) => roleData.id === this.id),
            position: data.roles.length
        });
        if ('members' in data) {
            for (const apiMember of data.members) {
                const member = new GuildMember_1.default(this, {
                    ...apiMember,
                    presence: new Presence_1.default(data.presences.find((apiPresence) => apiMember.user.id === apiPresence.user.id))
                });
                this.roles.cache.forEach((role) => {
                    if (!member.roles.cache.has(role.id)) {
                        return;
                    }
                    role.members.set(member.user.id, member);
                });
            }
            this.owner = this.members.cache.get(data.owner_id);
        }
        this.premium = {
            subscriptions: data.premium_subscription_count || 0,
            tier: data.premium_tier
        };
        this.verification = Object
            .keys(GuildVerificationLevels)
            .find((key) => {
            return GuildVerificationLevels[key] === data.verification_level;
        });
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
    bannerURL(options) {
        if (!this.banner) {
            return undefined;
        }
        options.format = options.format || (this.banner.startsWith('a_') ? 'gif' : 'png');
        return v10_1.RouteBases.cdn +
            v10_1.CDNRoutes.guildBanner(this.id, this.banner, options.format) +
            (options.size ? `?size=${options.size}` : '');
    }
    iconURL(options) {
        if (!this.icon) {
            return undefined;
        }
        options.format = options.format || (this.icon.startsWith('a_') ? 'gif' : 'png');
        return v10_1.RouteBases.cdn +
            v10_1.CDNRoutes.guildIcon(this.id, this.icon, options.format) +
            options.size ? `?size=${options.size}` : '';
    }
}
exports.default = Guild;
//# sourceMappingURL=Guild.js.map