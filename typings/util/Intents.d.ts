import BitField from './BitField';
export type IntentsResolvable = keyof typeof Intents.bits | number | bigint | IntentsResolvable[];
export default class Intents extends BitField {
    static bits: {
        Guilds: number;
        GuildMembers: number;
        GuildBans: number;
        GuildEmojisAndStickers: number;
        GuildIntegrations: number;
        GuildWebhooks: number;
        GuildInvites: number;
        GuildVoiceStates: number;
        GuildPresences: number;
        GuildMessages: number;
        GuildMessageReactions: number;
        GuildMessageTyping: number;
        DirectMessages: number;
        DirectMessageReactions: number;
        DirectMessageTyping: number;
        MessageContent: number;
        GuildScheduledEvents: number;
        AutoModerationConfiguration: number;
        AutoModerationExecution: number;
        GuildMessagePolls: number;
        DirectMessagePolls: number;
    };
    constructor(...bits: IntentsResolvable[]);
    has(bit: IntentsResolvable): boolean;
}
