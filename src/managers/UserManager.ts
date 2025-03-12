import { Routes } from 'discord-api-types/v10';

import Client from '../structures/Client';
import User from '../structures/User';

import Collection from '../util/Collection';

export default class UserManager {
    public cache = new Collection<string, User>();

    public constructor(private client: Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public async fetch(userId: string): Promise<User> {
        return new User(this.client, await this.client.request({
            method: 'GET',
            path: Routes.user(userId)
        }));
    }
}