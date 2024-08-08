import Client from '../classes/Client';
import User from '../classes/User';
import Collection from '../util/Collection';
export default class UserManager {
    private client;
    cache: Collection<string, User>;
    constructor(client: Client);
    fetch(user: string): Promise<User>;
}
