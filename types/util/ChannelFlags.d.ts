import BitField from './BitField';
export type ChannelFlag = keyof typeof ChannelFlags.bits;
export type ChannelFlagsResolvable = ChannelFlag | number | bigint | ChannelFlagsResolvable[];
export default class ChannelFlags extends BitField {
    static readonly bits: {
        readonly GuildFeedRemoved: 1;
        readonly Pinned: 2;
        readonly ActiveChannelsRemoved: 4;
        readonly RequireTag: 16;
        readonly IsSpam: 32;
        readonly IsGuildResourceChannel: 128;
        readonly ClydeAI: 256;
        readonly IsScheduledForDeletion: 512;
        readonly HideMediaDownloadOptions: 32768;
    };
    constructor(...bits: ChannelFlagsResolvable[]);
    has(bit: ChannelFlagsResolvable): boolean;
}
//# sourceMappingURL=ChannelFlags.d.ts.map