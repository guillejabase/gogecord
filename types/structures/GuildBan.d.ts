import type { APIBan } from 'discord-api-types/v10';
import Guild from './Guild';
import User from './User';
export default class GuildBan {
    guild: Guild;
    reason?: string;
    user: User;
    constructor(guild: Guild, data: APIBan);
}
//# sourceMappingURL=GuildBan.d.ts.map