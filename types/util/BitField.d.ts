export type BitFieldResolvable = string | number | bigint | string[] | number[] | bigint[];
export default class BitField {
    static readonly bits: {
        [key: string]: number;
    };
    bitField: number;
    constructor(...bits: BitFieldResolvable[]);
    private get function();
    static resolve(bit: BitFieldResolvable): number;
    has(bit: any): boolean;
    toArray(): string[];
}
//# sourceMappingURL=BitField.d.ts.map