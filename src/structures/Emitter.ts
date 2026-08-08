import { type Events } from './Event';

export type Listener<T extends any[]> = (...args: T) => void;

export class Emitter<E extends Record<string, any[]> = Events> {
  private listeners: {
    [K in keyof E]?: Listener<E[K]>[];
  } = {};

  public emit<K extends keyof E>(event: K, ...args: E[K]): void {
    const handlers = this.listeners[event];

    if (handlers) {
      for (const listener of handlers) {
        listener(...args);
      }
    }
  }
  public on<K extends keyof E>(event: K, listener: Listener<E[K]>): this {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(listener);
    return this;
  }
  public off<K extends keyof E>(event: K, listener: Listener<E[K]>): this {
    const handlers = this.listeners[event];

    if (handlers) {
      this.listeners[event] = handlers.filter((h) => h !== listener);
    }

    return this;
  }
}
