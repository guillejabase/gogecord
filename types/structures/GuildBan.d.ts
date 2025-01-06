import type { APIBan } from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import User from './User';
export default class GuildBan {
    client: Client;
    guild: Guild;
    reason?: string;
    user: User;
    constructor(client: Client, guild: Guild, data: APIBan);
}
//# sourceMappingURL=GuildBan.d.ts.map