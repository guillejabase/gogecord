export default class Collection<K, V> extends Map<K, V> {
    find(statement: (value: V) => boolean): V | undefined;
    map<T>(map: (value: V) => T): T[];
    some(statement: (value: V) => boolean): boolean;
}
//# sourceMappingURL=Collection.d.ts.map