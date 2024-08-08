export default class Snowflake {
    public static epoch = BigInt(1420070400000);

    public snowflake: string;
    public timestamp: number;

    constructor (snowflake: string) {
        this.snowflake = snowflake;
        this.timestamp = Number((BigInt(snowflake) >> BigInt(22)) + Snowflake.epoch);
    }
}