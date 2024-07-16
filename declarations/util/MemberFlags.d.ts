import BitField from './BitField';
export type MemberFlag = keyof typeof MemberFlags.bits;
export type MemberFlagsResolvable = keyof typeof MemberFlags.bits | number | bigint | MemberFlagsResolvable[];
export default class MemberFlags extends BitField {
    static bits: {
        DidRejoin: number;
        CompletedOnboarding: number;
        BypassesVerification: number;
        StartedOnboarding: number;
    };
    constructor(...bits: MemberFlagsResolvable[]);
    has(bit: MemberFlagsResolvable): boolean;
}
