export default class Snowflake {
    static epoch = BigInt(1420070400000);

    snowflake: string;
    timestamp: number;

    constructor (snowflake: string) {
        this.snowflake = snowflake;
        this.timestamp = Number((BigInt(snowflake) >> BigInt(22)) + Snowflake.epoch);
    }
}