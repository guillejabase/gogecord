"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Emoji {
    client;
    animated;
    available;
    id;
    managed;
    name;
    user;
    constructor(client, data) {
        this.client = client;
        this.animated = !!data.animated;
        this.available = !!data.available;
        this.id = data.id;
        this.managed = !!data.managed;
        this.name = data.name;
        this.user = client.users.cache.get(data.user.id);
        Object.defineProperty(this, 'client', { enumerable: false });
    }
    toString() {
        return `<${this.name}:${this.id}>`;
    }
}
exports.default = Emoji;
//# sourceMappingURL=Emoji.js.map