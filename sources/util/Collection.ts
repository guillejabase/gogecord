export default class Collection<K, V> extends Map<K, V> {
    find(statement: (item: V) => boolean) {
        return [...this.values()].find(statement);
    }

    map<T>(map: (item: V) => T) {
        return [...this.values()].map(map);
    }

    some(statement: (item: V) => boolean): boolean {
        return !!this.find(statement);
    }
}