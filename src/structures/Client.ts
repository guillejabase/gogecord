import { Glob } from 'bun';
import { RouteBases, Routes } from 'discord-api-types/v10';
import { join } from 'node:path';

import { type Command } from './Command';
import { Emitter } from './Emitter';
import { type Event } from './Event';
import { Gateway } from './Gateway';
import { type Guild } from './Guild';
import { type Presence } from './Presence';
import { type User } from './User';

import { Intents, type IntentsResolvable } from '../util/Intents';

export interface ClientOptions {
  intents: IntentsResolvable;
}
export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  body?: unknown;
}

export class Client<R extends boolean = boolean> extends Emitter {
  private queues = new Map<string, Promise<void>>();

  public gateway: Gateway;
  public intents: Intents;
  public readyTimestamp: R extends true ? number : number | null = null as any;
  public token: R extends true ? string : string | null = null as any;
  public user: R extends true ? User : User | null = null as any;

  public commands = new Map<string, Command>();
  public events = new Map<string, Event>();
  public guilds = new Map<string, Guild>();
  public presences = new Map<string, Presence>();
  public users = new Map<string, User>();

  public constructor(options: ClientOptions) {
    super();

    this.intents = new Intents(options.intents);
    this.gateway = new Gateway(this);
  }

  private async process<T>(options: RequestOptions, retries = 0): Promise<T> {
    const response = await fetch(`${RouteBases.api}${options.endpoint}`, {
      method: options.method,
      headers: {
        Authorization: `Bot ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (response.status === 429) {
      const header = response.headers.get('x-ratelimit-reset-after');
      let retryAfter = header ? parseFloat(header) * 1000 : 1000;

      try {
        const body = (await response.json()) as { retry_after?: number; };

        if (body.retry_after) {
          retryAfter = body.retry_after * 1000;
        }
      } catch { }

      await new Promise((r) => setTimeout(r, retryAfter));
      return this.process<T>(options, retries + 1);
    }
    if (!response.ok) {
      throw new Error(`Request failed (${response.status}): ${response.statusText}`);
    }

    const remaining = response.headers.get('x-ratelimit-remaining');
    const resetAfter = response.headers.get('x-ratelimit-reset-after');

    if (remaining === '0' && resetAfter) {
      await new Promise((r) => setTimeout(r, parseFloat(resetAfter) * 1000));
    }
    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  public destroy(): void {
    this.gateway.disconnect();
  }
  public async loadCommands(path: string): Promise<void> {
    const glob = new Glob('**/*.{ts,js}');

    for await (const file of glob.scan(path)) {
      const module = await import(join(path, file));
      const command = module.default ?? module;

      if (command && 'data' in command) {
        this.commands.set(command.data.name, command);
      }
    }
  }
  public async loadEvents(path: string): Promise<void> {
    const glob = new Glob('**/*.{ts,js}');

    for await (const file of glob.scan(path)) {
      const module = await import(join(path, file));
      const event = module.default ?? module;

      if (event && 'name' in event) {
        this.events.set(event.name, event);
      }
    }

    this.registerEvents();
  }
  public async login(token: string): Promise<void> {
    this.token = token;
    return await this.gateway.connect();
  }
  public async registerCommands(): Promise<void> {
    if (!this.user) {
      throw new Error('Cannot register commands before the client is ready.');
    }

    await this.request({
      method: 'PUT',
      endpoint: Routes.applicationCommands(this.user.id),
      body: Array.from(this.commands.values()).map((c) => c.data)
    });
  }
  public registerEvents(): void {
    for (const event of this.events.values()) {
      this.on(event.name, (...args: any[]) => {
        event.run(...(args as any));
      });
    }
  }
  public async request<T>(options: RequestOptions): Promise<T> {
    if (!this.token) {
      throw new Error(`Cannot make requests without a token`);
    }

    const route = `${options.method}:${options.endpoint.replace(/\d{17,19}/g, ':id')}`;

    let result!: T;

    const next = (this.queues.get(route) ?? Promise.resolve()).then(async () => {
      result = await this.process<T>(options);
    });

    this.queues.set(route, next);

    next.finally(() => {
      if (this.queues.get(route) === next) {
        this.queues.delete(route);
      }
    });

    await next;
    return result;
  }
}
