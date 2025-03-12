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
        let emitterListener = this.listeners[event];
        if (emitterListener) {
            emitterListener = emitterListener.filter((listening) => {
                return listener !== listening;
            });
        }
        this.listeners[event] = emitterListener;
        return this;
    }
    on(event, listener) {
        let emitterListener = this.listeners[event];
        if (!emitterListener) {
            emitterListener = [];
        }
        emitterListener.push(listener);
        this.listeners[event] = emitterListener;
        return this;
    }
}
exports.default = Emitter;
//# sourceMappingURL=Emitter.js.map