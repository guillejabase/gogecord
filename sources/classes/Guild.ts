import {
    GatewayGuildCreateDispatchData,
    GatewayGuildUpdateDispatchData
} from 'discord-api-types/v10';

import Channel from './Channel';
import Client from './Client';
import Member from './Member';
import Presence from './Presence';
import Role from './Role';

import BanManager from '../managers/BanManager';
import ChannelManager from '../managers/ChannelManager';
import MemberManager from '../managers/MemberManager';
import MessageManager from '../managers/MessageManager';
import RoleManager from '../managers/RoleManager';

import Snowflake from '../util/Snowflake';

const Features = {
    AnimatedBanner: 'ANIMATED_BANNER',
    AnimatedIcon: 'ANIMATED_ICON',
    ApplicationCommandPermissionsV2: 'APPLICATION_COMMAND_PERMISSIONS_V2',
    AutoModeration: 'AUTO_MODERATION',
    Banner: 'BANNER',
    ChannelIconEmojisGenerated: 'CHANNEL_ICON_EMOJIS_GENERATED',
    Community: 'COMMUNITY',
    CreatorMonetizableProvisional: 'CREATOR_MONETIZABLE_PROVISIONAL',
    CreatorStorePage: 'CREATOR_STORE_PAGE',
    DeveloperSupportServer: 'DEVELOPER_SUPPORT_SERVER',
    Discoverable: 'DISCOVERABLE',
    EnabledModerationExperienceForNonCommunity: 'ENABLED_MODERATION_EXPERIENCE_FOR_NON_COMMUNITY',
    Featurable: 'FEATURABLE',
    HasDirectoryEntry: 'HAS_DIRECTORY_ENTRY',
    InvitesDisabled: 'INVITES_DISABLED',
    InviteSplash: 'INVITE_SPLASH',
    MemberVerificationGateEnabled: 'MEMBER_VERIFICATION_GATE_ENABLED',
    MoreStickers: 'MORE_STICKERS',
    News: 'NEWS',
    Partnered: 'PARTNERED',
    PreviewEnabled: 'PREVIEW_ENABLED',
    PrivateThreads: 'PRIVATE_THREADS',
    RaidAlertsDisabled: 'RAID_ALERTS_DISABLED',
    RelayEnabled: 'RELAY_ENABLED',
    RoleIcons: 'ROLE_ICONS',
    RoleSubscriptionsAvailableForPurchase: 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE',
    RoleSubscriptionsEnabled: 'ROLE_SUBSCRIPTIONS_ENABLED',
    Soundboard: 'SOUNDBOARD',
    TextInVoiceEnabled: 'TEXT_IN_VOICE_ENABLED',
    TicketedEventsEnabled: 'TICKETED_EVENTS_ENABLED',
    VanityURL: 'VANITY_URL',
    Verified: 'VERIFIED',
    VIPRegions: 'VIP_REGIONS',
    WelcomeScreenEnabled: 'WELCOME_SCREEN_ENABLED'
};
const MFALevels = {
    None: 0,
    Elevated: 1
};
const NSFWLevels = {
    Default: 0,
    Explicit: 1,
    Safe: 2,
    AgeRestricte: 3
};
const PremiumTiers = {
    None: 0,
    Tier1: 1,
    Tier2: 2,
    Tier3: 3
};

export type Feature = keyof typeof Features;
export type MFALevel = keyof typeof MFALevels;
export type NSFWLevel = keyof typeof NSFWLevels;
export type PremiumTier = keyof typeof PremiumTiers;

export default class Guild {
    public banner?: string;
    public bans: BanManager;
    public channels!: ChannelManager;
    public created: {
        at: Date;
        timestamp: number;
    };
    public description?: string;
    public features: Feature[];
    public icon?: string;
    public id: string;
    public me!: Member;
    public members!: MemberManager;
    public mfaLevel: MFALevel;
    public name: string;
    public nsfwLevel: NSFWLevel;
    public owner!: Member;
    public premium: {
        subscriptions: number;
        tier: PremiumTier;
    };
    public roles!: RoleManager;

    constructor (client: Client, data: GatewayGuildCreateDispatchData | GatewayGuildUpdateDispatchData) {
        this.banner = data.banner || undefined;
        this.bans = new BanManager(client, this);
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.description = data.description || undefined;
        this.features = data.features.map((feature) => Object.keys(Features).find((key) => Features[key as Feature] == feature) as Feature);
        this.icon = data.icon || undefined;
        this.mfaLevel = Object.keys(MFALevels).find((key) => MFALevels[key as MFALevel] == data.mfa_level) as MFALevel;
        this.name = data.name;
        this.nsfwLevel = Object.keys(NSFWLevels).find((key) => NSFWLevels[key as NSFWLevel] == data.nsfw_level) as NSFWLevel;
        this.premium = {
            subscriptions: data.premium_subscription_count || 0,
            tier: Object.keys(PremiumTiers).find((key) => PremiumTiers[key as PremiumTier] == data.premium_tier) as PremiumTier
        };

        if ('channels' in data) {
            this.channels = new ChannelManager(client, this);

            data.channels.forEach((channelData) => {
                const channel = new Channel(channelData, this);

                channel.messages = new MessageManager(channel, client, this);

                this.channels.cache.set(channel.id, channel);
            });
        }

        this.roles = new RoleManager(client, this);

        const roles = data.roles.filter((role) => role.id != this.id);
        const length = Math.max(...roles.map((role) => role.position));

        roles.sort((a, b) => b.position - a.position).forEach((roleData) => {
            roleData.position = length - roleData.position + 1;

            const role = new Role(roleData, this);

            this.roles.cache.set(role.id, role);
        });

        if ('members' in data) {
            this.members = new MemberManager(client, this);

            data.members.forEach((memberData) => {
                const presence = new Presence(data.presences.find((presence) => presence.user.id == memberData.user.id));
                const member = new Member(client, memberData, this, presence);

                this.roles.cache.forEach((role) => {
                    if (member.roles.cache.has(role.id)) {
                        role.members.set(member.user.id, member);
                    }
                });

                client.users.cache.set(member.user.id, member.user);
                this.members.cache.set(member.user.id, member);
            });

            this.me = this.members.cache.get(client.user.id)!;
            this.owner = this.members.cache.get(data.owner_id)!;

            Object.defineProperty(this.me, 'guild', { enumerable: false });
            Object.defineProperty(this.owner, 'guild', { enumerable: false });
        }

        Object.defineProperties(this, {
            bans: { enumerable: false },
            channels: { enumerable: false },
            members: { enumerable: false },
            roles: { enumerable: false }
        });
    }
}