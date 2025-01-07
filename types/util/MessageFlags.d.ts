import BitField from './BitField';
export type MessageFlag = keyof typeof MessageFlags.bits;
export type MessageFlagsResolvable = MessageFlag | number | bigint | MessageFlagsResolvable[];
export default class MessageFlags extends BitField {
    static readonly bits: {
        readonly Crossposted: 1;
        readonly IsCrosspost: 2;
        readonly SuppressEmbeds: 4;
        readonly SourceMessageDeleted: 8;
        readonly Urgent: 16;
        readonly HasThread: 32;
        readonly Ephemeral: 64;
        readonly Loading: 128;
        readonly FailedToMentionSomeRolesInThread: 256;
        readonly SuppressNotifications: 4096;
        readonly IsVoiceMessage: 8192;
    };
    constructor(...bits: MessageFlagsResolvable[]);
    has(bit: MessageFlagsResolvable): boolean;
}
//# sourceMappingURL=MessageFlags.d.ts.map