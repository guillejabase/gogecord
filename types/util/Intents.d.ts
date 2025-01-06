import BitField from './BitField';
export type Intent = keyof typeof Intents.bits;
export type IntentsResolvable = Intent | number | bigint | IntentsResolvable[];
export default class Intents extends BitField {
    static readonly bits: {
        readonly Guilds: 1;
        readonly GuildMembers: 2;
        readonly GuildModeration: 4;
        readonly GuildEmojisAndStickers: 8;
        readonly GuildIntegrations: 16;
        readonly GuildWebhooks: 32;
        readonly GuildInvites: 64;
        readonly GuildVoiceStates: 128;
        readonly GuildPresences: 256;
        readonly GuildMessages: 512;
        readonly GuildMessageReactions: 1024;
        readonly GuildMessageTyping: 2048;
        readonly DirectMessages: 4096;
        readonly DirectMessageReactions: 8192;
        readonly DirectMessageTyping: 16384;
        readonly MessageContent: 32768;
        readonly GuildScheduledEvents: 65536;
        readonly AutoModerationConfiguration: 1048576;
        readonly AutoModerationExecution: 2097152;
        readonly GuildMessagePolls: 16777216;
        readonly DirectMessagePolls: 33554432;
    };
    constructor(...bits: IntentsResolvable[]);
    has(bit: IntentsResolvable): boolean;
}
//# sourceMappingURL=Intents.d.ts.map