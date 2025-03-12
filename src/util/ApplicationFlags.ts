import BitField from './BitField';

export type ApplicationFlag = keyof typeof ApplicationFlags.bits;
export type ApplicationFlagsResolvable = ApplicationFlag | number | bigint | ApplicationFlagsResolvable[];

export default class ApplicationFlags extends BitField {
    public static readonly bits = {
        EmbeddedReleased: 2,
        ManagedEmoji: 4,
        EmbeddedIAP: 8,
        GroupDMCreate: 16,
        ApplicationAutoModerationRuleCreateBadge: 64,
        RPCHasConnected: 2048,
        GatewayPresence: 4096,
        GatewayPresenceLimited: 8192,
        GatewayGuildMembers: 16384,
        GatewayGuildMembersLimited: 32768,
        VerificationPendingGuildLimit: 65536,
        Embedded: 131072,
        GatewayMessageContent: 262144,
        GatewayMessageContentLimited: 524288,
        EmbeddedFirstParty: 1048576,
        ApplicationCommandBadge: 8388608
    } as const;

    public constructor(...bits: ApplicationFlagsResolvable[]) {
        super(...bits);
    }

    public has(bit: ApplicationFlagsResolvable): boolean {
        return super.has(bit);
    }
}