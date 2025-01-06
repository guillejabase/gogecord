import BitField, { type BitFieldResolvable } from './BitField';

export type ChannelFlag = keyof typeof ChannelFlags.bits;
export type ChannelFlagsResolvable = ChannelFlag | number | bigint | ChannelFlagsResolvable[];

export default class ChannelFlags extends BitField {
    public static readonly bits = {
        GuildFeedRemoved: 1,
        Pinned: 2,
        ActiveChannelsRemoved: 4,
        RequireTag: 16,
        IsSpam: 32,
        IsGuildResourceChannel: 128,
        ClydeAI: 256,
        IsScheduledForDeletion: 512,
        HideMediaDownloadOptions: 32768
    } as const;

    constructor(...bits: ChannelFlagsResolvable[]) {
        super(...bits as BitFieldResolvable[]);
    }

    public has(bit: ChannelFlagsResolvable): boolean {
        return super.has(bit);
    }
}