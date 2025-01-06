import Client from '../structures/Client';
import User from '../structures/User';
import Collection from '../util/Collection';
export default class UserManager {
    private client;
    cache: Collection<string, User>;
    constructor(client: Client);
    fetch(userId: string): Promise<User>;
}
//# sourceMappingURL=UserManager.d.ts.map