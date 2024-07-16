import types from 'discord-api-types/v10';
import Collection from '../util/Collection';
import Channel from './Channel';
import Member from './Member';
import Role from './Role';
import Client from './Client';
import Snowflake from '../util/Snowflake';
import Presence from './Presence';

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

type Feature = keyof typeof Features;
type MFALevel = keyof typeof MFALevels;
type NSFWLevel = keyof typeof NSFWLevels;
type PremiumTier = keyof typeof PremiumTiers;

export default class Guild {
    private ownerId: string;

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
    channels = new Collection<string, Channel>();
    members = new Collection<string, Member>();
    roles = new Collection<string, Role>();

    constructor (
        client: Client,
        data: types.GatewayGuildCreateDispatchData | types.APIGuild
    ) {
        this.banner = data.banner || undefined;
        this.description = data.description || undefined;
        this.features = data.features.map((feature) => Object.keys(Features).find((key) => Features[key as Feature] == feature) as Feature);
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.mfaLevel = Object.keys(MFALevels).find((key) => MFALevels[key as MFALevel] == data.mfa_level) as MFALevel;
        this.name = data.name;
        this.nsfwLevel = Object.keys(NSFWLevels).find((key) => NSFWLevels[key as NSFWLevel] == data.nsfw_level) as NSFWLevel;
        this.icon = data.icon || undefined;
        this.ownerId = data.owner_id;
        this.premium = {
            subscriptions: data.premium_subscription_count!,
            tier: Object.keys(PremiumTiers).find((tier) => PremiumTiers[tier as PremiumTier] == data.premium_tier) as PremiumTier
        };

        if ('channels' in data) {
            data.channels.sort((a, b) => parseInt(b.id) - parseInt(a.id)).forEach((apiChannel) => {
                const channel = new Channel(client, apiChannel, this);
                this.channels.set(channel.id, channel);
            });
        }

        const roles = data.roles.filter((role) => role.id != this.id);
        const length = Math.max(...roles.map((role) => role.position));

        roles.sort((a, b) => b.position - a.position).forEach((apiRole) => {
            apiRole.position = length - apiRole.position + 1;

            const role = new Role(client, apiRole, this);
            this.roles.set(role.id, role);
        });

        if ('members' in data) {
            data.members.sort((a, b) => parseInt(b.user.id) - parseInt(a.user.id)).forEach((apiMember) => {
                const presence = new Presence(data.presences.find((presence) => presence.user.id == apiMember.user.id));
                const member = new Member(client, apiMember, this, presence);

                this.members.set(member.user.id, member);
            });
        }

        Object.defineProperties(this, {
            channels: { enumerable: false },
            members: { enumerable: false },
            roles: { enumerable: false },
            ownerId: { enumerable: false }
        });
    }

    get owner() {
        return this.members.get(this.ownerId);
    }
}