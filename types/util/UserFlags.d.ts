import BitField from './BitField';
export type UserFlag = keyof typeof UserFlags.bits;
export type UserFlagsResolvable = UserFlag | number | bigint | UserFlagsResolvable[];
export default class UserFlags extends BitField {
    static readonly bits: {
        readonly Staff: 1;
        readonly Partner: 2;
        readonly Hypesquad: 4;
        readonly BugHunterLevel1: 8;
        readonly HouseBravery: 64;
        readonly HouseBrilliance: 128;
        readonly HouseBalance: 256;
        readonly PremiumEarlySupporter: 512;
        readonly TeamPseudoUser: 1024;
        readonly BugHunterLevel2: 16384;
        readonly VerifiedBot: 65536;
        readonly VerifiedDeveloper: 131072;
        readonly CertifiedModerator: 262144;
        readonly BotHTTPInteractions: 524288;
        readonly ActiveDeveloper: 4194304;
    };
    constructor(...bits: UserFlagsResolvable[]);
    has(bit: UserFlagsResolvable): boolean;
}
//# sourceMappingURL=UserFlags.d.ts.map