import BitField from './BitField';
export type UserFlag = keyof typeof UserFlags.bits;
export type UserFlagsResolvable = keyof typeof UserFlags.bits | number | bigint | UserFlagsResolvable[];
export default class UserFlags extends BitField {
    static bits: {
        Staff: number;
        Partner: number;
        HypeSquad: number;
        BugHunterLevel1: number;
        HouseBravery: number;
        HouseBrilliance: number;
        HouseBalance: number;
        PremiumEarlySupporter: number;
        TeamPseudoUser: number;
        BugHunterLevel2: number;
        VerifiedBot: number;
        VerifiedDeveloper: number;
        CertifiedModerator: number;
        BotHTTPInteractions: number;
        ActiveDeveloper: number;
    };
    constructor(...bits: UserFlagsResolvable[]);
    has(bit: UserFlagsResolvable): boolean;
}
