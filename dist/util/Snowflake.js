"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Snowflake {
    static epoch = BigInt(1420070400000);
    timestamp;
    constructor(snowflake) {
        this.timestamp = Number((BigInt(snowflake) >> BigInt(22)) + Snowflake.epoch);
    }
}
exports.default = Snowflake;
//# sourceMappingURL=Snowflake.js.map