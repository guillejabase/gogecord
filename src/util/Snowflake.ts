export default class Snowflake {
    private static epoch = BigInt(1420070400000);

    public timestamp: number;

    constructor(snowflake: string) {
        this.timestamp = Number((BigInt(snowflake) >> BigInt(22)) + Snowflake.epoch);
    }
}