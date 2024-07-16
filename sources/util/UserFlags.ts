import BitField, { BitFieldResolvable } from './BitField';

export type UserFlag = keyof typeof UserFlags.bits;
export type UserFlagsResolvable = keyof typeof UserFlags.bits | number | bigint | UserFlagsResolvable[];

export default class UserFlags extends BitField {
    public static bits = {
        Staff: 1,
        Partner: 2,
        HypeSquad: 4,
        BugHunterLevel1: 8,
        HouseBravery: 64,
        HouseBrilliance: 128,
        HouseBalance: 256,
        PremiumEarlySupporter: 512,
        TeamPseudoUser: 1024,
        BugHunterLevel2: 16384,
        VerifiedBot: 65536,
        VerifiedDeveloper: 131072,
        CertifiedModerator: 262144,
        BotHTTPInteractions: 524288,
        ActiveDeveloper: 4194304
    };

    constructor (...bits: UserFlagsResolvable[]) {
        super(...bits as BitFieldResolvable[]);
    }

    public has(bit: UserFlagsResolvable) {
        return super.has(bit);
    }
}