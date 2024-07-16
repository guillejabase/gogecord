export type BitFieldResolvable = string | number | bigint | string[] | number[] | bigint[];
export default class BitField {
    static bits: {
        [key: string]: number;
    };
    bitField: number;
    constructor(...bits: BitFieldResolvable[]);
    get function(): typeof BitField;
    static resolve(bit: BitFieldResolvable): number;
    has(bit: any): boolean;
    toArray(): string[];
}
