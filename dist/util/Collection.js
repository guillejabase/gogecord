"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    find(statement) {
        return [...this.values()].find(statement);
    }
    map(map) {
        return [...this.values()].map(map);
    }
    some(statement) {
        return !!this.find(statement);
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map