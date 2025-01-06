import BitField from './BitField';
export type GuildRoleFlag = keyof typeof GuildRoleFlags.bits;
export type GuildRoleFlagsResolvable = GuildRoleFlag | number | bigint | GuildRoleFlagsResolvable[];
export default class GuildRoleFlags extends BitField {
    static readonly bits: {
        readonly InPrompt: 1;
    };
    constructor(...bits: GuildRoleFlagsResolvable[]);
    has(bit: GuildRoleFlagsResolvable): boolean;
}
//# sourceMappingURL=GuildRoleFlags.d.ts.map