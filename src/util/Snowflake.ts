const epoch = 1420070400000n;

export class Snowflake {
  public readonly timestamp: number;

  public constructor(id: string) {
    this.timestamp = Number((BigInt(id) >> 2n) + epoch);
  }
}
