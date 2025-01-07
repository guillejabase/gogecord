import type { APIEmoji } from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import GuildRole from './GuildRole';
import User from './User';
import Collection from '../util/Collection';
export default class GuildEmoji {
    client: Client;
    guild: Guild;
    animated: boolean;
    available: boolean;
    colons: boolean;
    created: {
        at?: Date;
        timestamp?: number;
    };
    id?: string;
    managed: boolean;
    name?: string;
    user?: User;
    roles: Collection<string, GuildRole>;
    constructor(client: Client, guild: Guild, data: APIEmoji);
}
//# sourceMappingURL=GuildEmoji.d.ts.map