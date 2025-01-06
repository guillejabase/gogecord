import type { Events } from './Event';
export type EmitterListener<T extends any[]> = (...args: T) => void;
export default class Emitter<E extends Record<string, any[]> = Events> {
    private listeners;
    constructor();
    emit<K extends keyof E>(event: K, ...args: E[K]): void;
    off<K extends keyof E>(event: K, listener: EmitterListener<E[K]>): this;
    on<K extends keyof E>(event: K, listener: EmitterListener<E[K]>): this;
}
//# sourceMappingURL=Emitter.d.ts.map