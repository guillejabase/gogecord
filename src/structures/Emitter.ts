import type { Events } from './Event';

export type EmitterListener<T extends any[]> = (...args: T) => void;

export default class Emitter<E extends Record<string, any[]> = Events> {
    private listeners: {
        [K in keyof E]?: EmitterListener<E[K]>[];
    } = {};

    public constructor() {
        Object.defineProperty(this, 'listeners', { enumerable: false });
    }

    public emit<K extends keyof E>(event: K, ...args: E[K]): void {
        this.listeners[event]?.forEach((listener) => {
            listener(...args);
        });
    }
    public off<K extends keyof E>(event: K, listener: EmitterListener<E[K]>): this {
        let emitterListener = this.listeners[event];

        if (emitterListener) {
            emitterListener = emitterListener.filter((listening) => {
                return listener !== listening;
            });
        }
        
        this.listeners[event] = emitterListener;

        return this;
    }
    public on<K extends keyof E>(event: K, listener: EmitterListener<E[K]>): this {
        let emitterListener = this.listeners[event];

        if (!emitterListener) {
            emitterListener = [];
        }

        emitterListener.push(listener);

        this.listeners[event] = emitterListener;

        return this;
    }
}