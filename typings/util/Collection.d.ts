export default class Collection<key, value> extends Map<key, value> {
    find(statement: (item: value) => boolean): value | undefined;
    map<type>(map: (item: value) => type): type[];
    some(statement: (item: value) => boolean): boolean;
}
