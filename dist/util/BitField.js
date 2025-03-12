"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BitField {
    static bits;
    bitField = 0;
    constructor(...bits) {
        this.bitField = bits.reduce((previous, current) => {
            return previous + this.function.resolve(current);
        }, 0);
    }
    get function() {
        return this.constructor;
    }
    static resolve(bit) {
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
            return bit.reduce((previous, current) => {
                return this.resolve(current) + previous;
            }, 0);
        }
        throw new Error(`Invalid bit field flag type ${typeof bit}`);
    }
    has(bit) {
        const resolved = this.function.resolve(bit);
        return (this.bitField & resolved) === resolved;
    }
    toArray() {
        return Object
            .keys(this.function.bits)
            .filter((bit) => {
            return this.has(bit);
        });
    }
}
exports.default = BitField;
//# sourceMappingURL=BitField.js.map