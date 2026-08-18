export class Collection<K, V> extends Map<K, V> {
  public filter(fn: (value: V, key: K) => boolean): Collection<K, V> {
    const results = new Collection<K, V>();

    for (const [key, val] of this) {
      if (fn(val, key)) {
        results.set(key, val);
      }
    }

    return results;
  }
  public find(fn: (value: V, key: K) => boolean): V | undefined {
    for (const [key, val] of this) {
      if (fn(val, key)) {
        return val;
      }
    }

    return undefined;
  }
  public map<T>(fn: (value: V, key: K) => T): T[] {
    const results: T[] = [];

    for (const [key, val] of this) {
      results.push(fn(val, key));
    }

    return results;
  }
}
