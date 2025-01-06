import BitField from './BitField';
export type GuildMemberFlag = keyof typeof GuildMemberFlags.bits;
export type GuildMemberFlagsResolvable = GuildMemberFlag | number | bigint | GuildMemberFlagsResolvable[];
export default class GuildMemberFlags extends BitField {
    static readonly bits: {
        readonly DidRejoin: 1;
        readonly CompletedOnboarding: 2;
        readonly BypassesVerification: 4;
        readonly StartedOnboarding: 8;
        readonly IsGuest: 16;
        readonly StartedHomeActions: 32;
        readonly CompletedHomeActions: 64;
        readonly AutomodQuarantinedGuildMemberNameOrGuildNickname: 128;
        readonly DMSettingsUpsellAcknowledged: 512;
    };
    constructor(...bits: GuildMemberFlagsResolvable[]);
    has(bit: GuildMemberFlagsResolvable): boolean;
}
//# sourceMappingURL=GuildMemberFlags.d.ts.map