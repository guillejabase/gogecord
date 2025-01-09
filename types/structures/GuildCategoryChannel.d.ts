import type { APIGuildCategoryChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildBasedChannel from './GuildBasedChannel';
export default class GuildCategoryChanel extends GuildBasedChannel {
    readonly type = "GuildCategory";
    constructor(guild: Guild, data: APIGuildCategoryChannel);
}
//# sourceMappingURL=GuildCategoryChannel.d.ts.map