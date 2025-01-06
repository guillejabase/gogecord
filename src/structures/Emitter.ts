import type { Events } from './Event';

export type EmitterListener<T extends any[]> = (...args: T) => void;

export default class Emitter<E extends Record<string, any[]> = Events> {
    private listeners: {
        [K in keyof E]?: EmitterListener<E[K]>[];
    } = {};

    constructor() {
        Object.defineProperty(this, 'listeners', { enumerable: false });
    }

    public emit<K extends keyof E>(event: K, ...args: E[K]): void {
        this.listeners[event]?.forEach((listener) => {
            listener(...args);
        });
    }
    public off<K extends keyof E>(event: K, listener: EmitterListener<E[K]>): this {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event]!.filter((listening) => {
                listener !== listening;
            });
        }

        return this;
    }
    public on<K extends keyof E>(event: K, listener: EmitterListener<E[K]>): this {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]!.push(listener);

        return this;
    }
}