import type { APIEmoji } from 'discord-api-types/v10';

import Client from './Client';
import User from './User';

export default class Emoji {
    public animated: boolean;
    public available: boolean;
    public id: string;
    public managed: boolean;
    public name: string;
    public user: User;

    constructor(public client: Client, data: APIEmoji) {
        this.animated = !!data.animated;
        this.available = !!data.available;
        this.id = data.id!;
        this.managed = !!data.managed;
        this.name = data.name!;
        this.user = client.users.cache.get(data.user!.id)!;

        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public toString(): string {
        return `<${this.name}:${this.id}>`;
    }
}