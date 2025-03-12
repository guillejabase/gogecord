export type BitFieldResolvable = string | number | bigint | BitFieldResolvable[];

export default class BitField {
    public static readonly bits: {
        [key: string]: number;
    };
    public bitField = 0;

    public constructor(...bits: BitFieldResolvable[]) {
        this.bitField = (bits as number[]).reduce((previous, current) => {
            return previous + this.function.resolve(current);
        }, 0);
    }

    private get function(): typeof BitField {
        return this.constructor as typeof BitField;
    }

    public static resolve(bit: BitFieldResolvable): number {
        if (!bit) {
            return 0;
        }
        if (typeof bit == 'number' || typeof bit == 'bigint') {
            bit = Number(bit);

            if (bit < 0 || bit > (Object.values(this.bits).at(-1) || NaN) * 2) {
                throw new Error(`Invalid bit field number: ${bit}`);
            }

            return bit;
        }
        if (typeof bit == 'string') {
            if (!(bit in this.bits)) {
                throw new Error(`Invalid bit field flag: ${bit}`);
            }

            return this.bits[bit];
        }
        if (Array.isArray(bit)) {
            return (bit as any[]).reduce((previous, current) => {
                return this.resolve(current) + previous;
            }, 0);
        }

        throw new Error(`Invalid bit field flag type ${typeof bit}`);
    }
    public has(bit: any): boolean {
        const resolved = this.function.resolve(bit);

        return (this.bitField & resolved) === resolved;
    }
    public toArray(): string[] {
        return Object
            .keys(this.function.bits)
            .filter((bit) => {
                return this.has(bit);
            });
    }
}