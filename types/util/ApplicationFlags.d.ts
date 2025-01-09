import BitField from './BitField';
export type ApplicationFlag = keyof typeof ApplicationFlags.bits;
export type ApplicationFlagsResolvable = ApplicationFlag | number | bigint | ApplicationFlagsResolvable[];
export default class ApplicationFlags extends BitField {
    static readonly bits: {
        readonly EmbeddedReleased: 2;
        readonly ManagedEmoji: 4;
        readonly EmbeddedIAP: 8;
        readonly GroupDMCreate: 16;
        readonly ApplicationAutoModerationRuleCreateBadge: 64;
        readonly RPCHasConnected: 2048;
        readonly GatewayPresence: 4096;
        readonly GatewayPresenceLimited: 8192;
        readonly GatewayGuildMembers: 16384;
        readonly GatewayGuildMembersLimited: 32768;
        readonly VerificationPendingGuildLimit: 65536;
        readonly Embedded: 131072;
        readonly GatewayMessageContent: 262144;
        readonly GatewayMessageContentLimited: 524288;
        readonly EmbeddedFirstParty: 1048576;
        readonly ApplicationCommandBadge: 8388608;
    };
    constructor(...bits: ApplicationFlagsResolvable[]);
    has(bit: ApplicationFlagsResolvable): boolean;
}
//# sourceMappingURL=ApplicationFlags.d.ts.map