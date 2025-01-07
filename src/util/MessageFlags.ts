import BitField, { type BitFieldResolvable } from './BitField';

export type MessageFlag = keyof typeof MessageFlags.bits;
export type MessageFlagsResolvable = MessageFlag | number | bigint | MessageFlagsResolvable[];

export default class MessageFlags extends BitField {
    public static readonly bits = {
        Crossposted: 1,
        IsCrosspost: 2,
        SuppressEmbeds: 4,
        SourceMessageDeleted: 8,
        Urgent: 16,
        HasThread: 32,
        Ephemeral: 64,
        Loading: 128,
        FailedToMentionSomeRolesInThread: 256,
        SuppressNotifications: 4096,
        IsVoiceMessage: 8192
    } as const;

    constructor(...bits: MessageFlagsResolvable[]) {
        super(...bits as BitFieldResolvable[]);
    }

    public has(bit: MessageFlagsResolvable): boolean {
        return super.has(bit);
    }
}