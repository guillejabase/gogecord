export default class Collection<K, V> extends Map<K, V> {
    public find(statement: (value: V) => boolean): V | undefined {
        return [...this.values()].find(statement);
    }
    public map<T>(map: (value: V) => T): T[] {
        return [...this.values()].map(map);
    }
    public some(statement: (value: V) => boolean): boolean {
        return !!this.find(statement);
    }
}