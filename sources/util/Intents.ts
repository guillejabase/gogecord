import BitField, { BitFieldResolvable } from './BitField';

export type IntentsResolvable = keyof typeof Intents.bits | number | bigint | IntentsResolvable[];

export default class Intents extends BitField {
    public static bits = {
        Guilds: 1,
        GuildMembers: 2,
        GuildBans: 4,
        GuildEmojisAndStickers: 8,
        GuildIntegrations: 16,
        GuildWebhooks: 32,
        GuildInvites: 64,
        GuildVoiceStates: 128,
        GuildPresences: 256,
        GuildMessages: 512,
        GuildMessageReactions: 1024,
        GuildMessageTyping: 2048,
        DirectMessages: 4096,
        DirectMessageReactions: 8192,
        DirectMessageTyping: 16384,
        MessageContent: 32768,
        GuildScheduledEvents: 65536,
        AutoModerationConfiguration: 131072,
        AutoModerationExecution: 262144,
        GuildMessagePolls: 16777216,
        DirectMessagePolls: 33554432
    };

    constructor (...bits: IntentsResolvable[]) {
        super(...bits as BitFieldResolvable[]);
    }

    public has(bit: IntentsResolvable): boolean {
        return super.has(bit);
    }
}