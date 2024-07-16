export default class Collection<K, V> extends Map<K, V> {
    find(statement: (item: V) => boolean): V | undefined;
    map<T>(map: (item: V) => T): T[];
    some(statement: (item: V) => boolean): boolean;
}
