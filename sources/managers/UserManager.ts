import Client from '../classes/Client';
import User from '../classes/User';

import Collection from '../util/Collection';

export default class UserManager {
    private client: Client;

    public cache = new Collection<string, User>();

    constructor (client: Client) {
        this.client = client;

        Object.defineProperty(this, 'client', { enumerable: false });
    }

    public async fetch(user: string): Promise<User> {
        return new User(await this.client.request('get', `/users/${user}`));
    }
}