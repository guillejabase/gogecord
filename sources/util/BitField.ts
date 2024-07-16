export type BitFieldResolvable = string | number | bigint | string[] | number[] | bigint[];

export default class BitField {
    static bits: {
        [key: string]: number;
    } = {};

    bitField = 0;

    constructor (...bits: BitFieldResolvable[]) {
        this.bitField = (bits as number[]).reduce((previous, current) => previous + this.function.resolve(current), 0);
    }

    get function() {
        return this.constructor as typeof BitField;
    }

    static resolve(bit: BitFieldResolvable): number {
        if (!bit) {
            return 0;
        }
        if (typeof bit == 'number' || typeof bit == 'bigint') {
            bit = Number(bit);

            if (bit < 0 || bit > (Object.values(this.bits).at(-1) || NaN) * 2) {
                throw RangeError(`Invalid bit field number: ${bit}`);
            }

            return bit;
        } else if (typeof bit == 'string') {
            if (!(bit in this.bits)) {
                throw RangeError(`Invalid bit field flag: ${bit}`);
            }

            return this.bits[bit];
        } else if (Array.isArray(bit)) {
            return (bit as any[]).reduce((previous, current) => this.resolve(current) + previous, 0);
        } else {
            throw TypeError(`Invalid bit field flag type ${typeof bit}`);
        }
    }

    has(bit: any) {
        return (this.bitField & this.function.resolve(bit)) == this.function.resolve(bit);
    }

    toArray() {
        return Object.keys(this.function.bits).filter((bit) => this.has(bit));
    }
}