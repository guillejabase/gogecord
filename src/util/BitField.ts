export type BitFieldResolvable<T extends string, N extends number | bigint> = N | T | BitField<T, N> | BitFieldResolvable<T, N>[];

export class BitField<T extends string, N extends number | bigint> {
  public bitField: N;

  public constructor(bits?: BitFieldResolvable<T, N>, private readonly flags?: Record<T, N>) {
    this.bitField = (typeof (flags ? Object.values(flags)[0] : 0) === 'bigint' ? 0n : 0) as N;

    if (bits) {
      this.bitField = this.resolve(bits);
    }
  }

  public resolve(bit: BitFieldResolvable<T, N>): N {
    if (typeof bit === 'number' || typeof bit === 'bigint') {
      return bit as N;
    }
    if (bit instanceof BitField) {
      return bit.bitField;
    }
    if (Array.isArray(bit)) {
      const initial = (typeof (this.flags ? Object.values(this.flags)[0] : 0) === 'bigint' ? 0n : 0) as N;
      const value = (bit as BitFieldResolvable<T, N>[]).reduce((a, b) => {
        const resolved = this.resolve(b);
        return (typeof a === 'bigint' ? ((a as bigint) | (resolved as bigint)) : ((a as number) | (resolved as number))) as N;
      }, initial);

      return value as unknown as N;
    }
    if (typeof bit === 'string' && this.flags && bit in this.flags) {
      return this.flags[bit as T];
    }

    throw new RangeError(`Invalid or unsupported bit field flag: ${String(bit)}`);
  }
  public has(bit: BitFieldResolvable<T, N>): boolean {
    const resolved = this.resolve(bit);

    if (typeof this.bitField === 'bigint') {
      return (this.bitField & (resolved as bigint)) === resolved;
    }

    return (this.bitField & (resolved as number)) === resolved;
  }
  public toArray(): T[] {
    if (!this.flags) return [];

    return (Object.keys(this.flags) as T[]).filter((f) => this.has(f));
  }
}
