import Client from '../structures/Client';
import Guild from '../structures/Guild';
import Collection from '../util/Collection';
export default class GuildManager {
    private client;
    cache: Collection<string, Guild>;
    constructor(client: Client);
    fetch(guildId: string): Promise<Guild>;
}
//# sourceMappingURL=GuildManager.d.ts.map