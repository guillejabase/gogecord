export default class Collection<key, value> extends Map<key, value> {
    public find(statement: (item: value) => boolean): value | undefined {
        return [...this.values()].find(statement);
    }
    public map<type>(map: (item: value) => type): type[] {
        return [...this.values()].map(map);
    }
    public some(statement: (item: value) => boolean): boolean {
        return !!this.find(statement);
    }
}