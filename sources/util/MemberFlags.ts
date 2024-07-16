import BitField, { BitFieldResolvable } from './BitField';

export type MemberFlag = keyof typeof MemberFlags.bits;
export type MemberFlagsResolvable = keyof typeof MemberFlags.bits | number | bigint | MemberFlagsResolvable[];

export default class MemberFlags extends BitField {
    public static bits = {
        DidRejoin: 1,
        CompletedOnboarding: 2,
        BypassesVerification: 4,
        StartedOnboarding: 8
    };

    constructor (...bits: MemberFlagsResolvable[]) {
        super(...bits as BitFieldResolvable[]);
    }

    public has(bit: MemberFlagsResolvable) {
        return super.has(bit);
    }
}