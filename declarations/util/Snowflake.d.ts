export default class Snowflake {
    static epoch: bigint;
    snowflake: string;
    timestamp: number;
    constructor(snowflake: string);
}
