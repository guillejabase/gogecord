"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    listeners = {};
    constructor() {
        Object.defineProperty(this, 'listeners', { enumerable: false });
    }
    emit(event, ...args) {
        this.listeners[event]?.forEach((listener) => {
            listener(...args);
        });
    }
    off(event, listener) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter((listening) => {
                listener !== listening;
            });
        }
        return this;
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
        return this;
    }
}
exports.default = Emitter;
//# sourceMappingURL=Emitter.js.map