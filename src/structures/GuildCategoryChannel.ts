import type { APIGuildCategoryChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildBasedChannel from './GuildBasedChannel';

export default class GuildCategoryChanel extends GuildBasedChannel {
    public readonly type = 'GuildCategory';

    public constructor(guild: Guild, data: APIGuildCategoryChannel) {
        super(guild, data);
    }
}