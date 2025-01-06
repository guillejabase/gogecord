import type Types from 'discord-api-types/v10';

import Client from './Client';

export type GatewayEventPayloads = {
    APPLICATION_COMMAND_PERMISSIONS_UPDATE: Types.GatewayApplicationCommandPermissionsUpdateDispatchData;
    AUTO_MODERATION_ACTION_EXECUTION: Types.GatewayAutoModerationActionExecutionDispatchData;
    AUTO_MODERATION_RULE_CREATE: Types.GatewayAutoModerationRuleCreateDispatchData;
    AUTO_MODERATION_RULE_DELETE: Types.GatewayAutoModerationRuleDeleteDispatchData;
    AUTO_MODERATION_RULE_UPDATE: Types.GatewayAutoModerationRuleUpdateDispatchData;
    CHANNEL_CREATE: Types.GatewayChannelCreateDispatchData;
    CHANNEL_DELETE: Types.GatewayChannelDeleteDispatchData;
    CHANNEL_PINS_UPDATE: Types.GatewayChannelPinsUpdateDispatchData;
    CHANNEL_UPDATE: Types.GatewayChannelUpdateDispatchData;
    ENTITLEMENT_CREATE: Types.GatewayEntitlementCreateDispatchData;
    ENTITLEMENT_DELETE: Types.GatewayEntitlementDeleteDispatchData;
    ENTITLEMENT_UPDATE: Types.GatewayEntitlementUpdateDispatchData;
    GUILD_AUDIT_LOG_ENTRY_CREATE: Types.GatewayGuildAuditLogEntryCreateDispatchData;
    GUILD_BAN_ADD: Types.GatewayGuildBanAddDispatchData;
    GUILD_BAN_REMOVE: Types.GatewayGuildBanRemoveDispatchData;
    GUILD_CREATE: Types.GatewayGuildCreateDispatchData;
    GUILD_DELETE: Types.GatewayGuildDeleteDispatchData;
    GUILD_EMOJIS_UPDATE: Types.GatewayGuildEmojisUpdateDispatchData;
    GUILD_INTEGRATIONS_UPDATE: Types.GatewayGuildIntegrationsUpdateDispatchData;
    GUILD_MEMBERS_CHUNK: Types.GatewayGuildMembersChunkDispatchData;
    GUILD_MEMBER_ADD: Types.GatewayGuildMemberAddDispatchData;
    GUILD_MEMBER_REMOVE: Types.GatewayGuildMemberRemoveDispatchData;
    GUILD_MEMBER_UPDATE: Types.GatewayGuildMemberUpdateDispatchData;
    GUILD_ROLE_CREATE: Types.GatewayGuildRoleCreateDispatchData;
    GUILD_ROLE_DELETE: Types.GatewayGuildRoleDeleteDispatchData;
    GUILD_ROLE_UPDATE: Types.GatewayGuildRoleUpdateDispatchData;
    GUILD_SCHEDULED_EVENT_CREATE: Types.GatewayGuildScheduledEventCreateDispatchData;
    GUILD_SCHEDULED_EVENT_DELETE: Types.GatewayGuildScheduledEventDeleteDispatchData;
    GUILD_SCHEDULED_EVENT_UPDATE: Types.GatewayGuildScheduledEventUpdateDispatchData;
    GUILD_SCHEDULED_EVENT_USER_ADD: Types.GatewayGuildScheduledEventUserAddDispatchData;
    GUILD_SCHEDULED_EVENT_USER_REMOVE: Types.GatewayGuildScheduledEventUserRemoveDispatchData;
    GUILD_SOUNDBOARD_SOUNDS_UPDATE: Types.GatewayGuildSoundboardSoundsUpdateDispatchData;
    GUILD_SOUNDBOARD_SOUND_CREATE: Types.GatewayGuildSoundboardSoundCreateDispatchData;
    GUILD_SOUNDBOARD_SOUND_DELETE: Types.GatewayGuildSoundboardSoundDeleteDispatchData;
    GUILD_SOUNDBOARD_SOUND_UPDATE: Types.GatewayGuildSoundboardSoundUpdateDispatchData;
    GUILD_STICKERS_UPDATE: Types.GatewayGuildStickersUpdateDispatchData;
    GUILD_UPDATE: Types.GatewayGuildUpdateDispatchData;
    INTEGRATION_CREATE: Types.GatewayIntegrationCreateDispatchData;
    INTEGRATION_DELETE: Types.GatewayIntegrationDeleteDispatchData;
    INTEGRATION_UPDATE: Types.GatewayIntegrationUpdateDispatchData;
    INTERACTION_CREATE: Types.GatewayInteractionCreateDispatchData;
    INVITE_CREATE: Types.GatewayInviteCreateDispatchData;
    INVITE_DELETE: Types.GatewayInviteDeleteDispatchData;
    MESSAGE_CREATE: Types.GatewayMessageCreateDispatchData;
    MESSAGE_DELETE: Types.GatewayMessageDeleteDispatchData;
    MESSAGE_DELETE_BULK: Types.GatewayMessageDeleteBulkDispatchData;
    MESSAGE_POLL_VOTE_ADD: Types.GatewayMessagePollVoteDispatchData;
    MESSAGE_POLL_VOTE_REMOVE: Types.GatewayMessagePollVoteDispatchData;
    MESSAGE_REACTION_ADD: Types.GatewayMessageReactionAddDispatchData;
    MESSAGE_REACTION_REMOVE: Types.GatewayMessageReactionRemoveDispatchData;
    MESSAGE_REACTION_REMOVE_ALL: Types.GatewayMessageReactionRemoveAllDispatchData;
    MESSAGE_REACTION_REMOVE_EMOJI: Types.GatewayMessageReactionRemoveEmojiDispatchData;
    MESSAGE_UPDATE: Types.GatewayMessageUpdateDispatchData;
    PRESENCE_UPDATE: Types.GatewayPresenceUpdateDispatchData;
    READY: Types.GatewayReadyDispatchData;
    RESUMED: Types.GatewayResumeData;
    SOUNDBOARD_SOUNDS: Types.GatewaySoundboardSoundsDispatchData;
    STAGE_INSTANCE_CREATE: Types.GatewayStageInstanceCreateDispatchData;
    STAGE_INSTANCE_DELETE: Types.GatewayStageInstanceDeleteDispatchData;
    STAGE_INSTANCE_UPDATE: Types.GatewayStageInstanceUpdateDispatchData;
    SUBSCRIPTION_CREATE: Types.GatewaySubscriptionCreateDispatchData;
    SUBSCRIPTION_DELETE: Types.GatewaySubscriptionDeleteDispatchData;
    SUBSCRIPTION_UPDATE: Types.GatewaySubscriptionUpdateDispatchData;
    THREAD_CREATE: Types.GatewayThreadCreateDispatchData;
    THREAD_DELETE: Types.GatewayThreadDeleteDispatchData;
    THREAD_LIST_SYNC: Types.GatewayThreadListSyncDispatchData;
    THREAD_MEMBERS_UPDATE: Types.GatewayThreadMembersUpdateDispatchData;
    THREAD_MEMBER_UPDATE: Types.GatewayThreadMemberUpdateDispatchData;
    THREAD_UPDATE: Types.GatewayThreadUpdateDispatchData;
    TYPING_START: Types.GatewayTypingStartDispatchData;
    USER_UPDATE: Types.GatewayUserUpdateDispatchData;
    VOICE_CHANNEL_EFFECT_SEND: Types.GatewayVoiceChannelEffectSendDispatchData;
    VOICE_SERVER_UPDATE: Types.GatewayVoiceServerUpdateDispatchData;
    VOICE_STATE_UPDATE: Types.GatewayVoiceStateUpdateDispatchData;
    WEBHOOKS_UPDATE: Types.GatewayWebhooksUpdateDispatchData;
};
export type GatewayEventOptions<K extends keyof GatewayEventPayloads> = {
    name: K,
    run: (client: Client, data: GatewayEventPayloads[K]) => void;
};

export default class GatewayEvent<K extends keyof GatewayEventPayloads = keyof GatewayEventPayloads> {
    public name: GatewayEventOptions<K>['name'];
    public run: GatewayEventOptions<K>['run'];

    constructor(options: GatewayEventOptions<K>) {
        const { name, run } = options;

        this.name = name;
        this.run = run;
    }
}