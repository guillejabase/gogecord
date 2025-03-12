import BitField from './BitField';

export type GuildMemberFlag = keyof typeof GuildMemberFlags.bits;
export type GuildMemberFlagsResolvable = GuildMemberFlag | number | bigint | GuildMemberFlagsResolvable[];

export default class GuildMemberFlags extends BitField {
    public static readonly bits = {
        DidRejoin: 1,
        CompletedOnboarding: 2,
        BypassesVerification: 4,
        StartedOnboarding: 8,
        IsGuest: 16,
        StartedHomeActions: 32,
        CompletedHomeActions: 64,
        AutomodQuarantinedGuildMemberNameOrGuildNickname: 128,
        DMSettingsUpsellAcknowledged: 512
    } as const;

    public constructor(...bits: GuildMemberFlagsResolvable[]) {
        super(...bits);
    }

    public has(bit: GuildMemberFlagsResolvable): boolean {
        return super.has(bit);
    }
}