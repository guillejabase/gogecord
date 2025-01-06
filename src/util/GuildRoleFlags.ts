import BitField, { type BitFieldResolvable } from './BitField';

export type GuildRoleFlag = keyof typeof GuildRoleFlags.bits;
export type GuildRoleFlagsResolvable = GuildRoleFlag | number | bigint | GuildRoleFlagsResolvable[];

export default class GuildRoleFlags extends BitField {
    public static readonly bits = {
        InPrompt: 1
    } as const;

    constructor(...bits: GuildRoleFlagsResolvable[]) {
        super(...bits as BitFieldResolvable[]);
    }

    public has(bit: GuildRoleFlagsResolvable): boolean {
        return super.has(bit);
    }
}