import { Routes } from 'discord-api-types/v10';

import Client from '../structures/Client';
import User from '../structures/User';

import Collection from '../util/Collection';

export default class UserManager {
    public cache = new Collection<string, User>();

    constructor(private client: Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public async fetch(userId: string): Promise<User> {
        return new User(this.client, await this.client.request({
            method: 'get',
            path: Routes.user(userId)
        }));
    }
}