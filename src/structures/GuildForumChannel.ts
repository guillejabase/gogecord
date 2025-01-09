import type { APIGuildForumChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';

export default class GuildForumChannel extends GuildTextBasedChannel {
    public readonly type = 'GuildForum';

    constructor(guild: Guild, data: APIGuildForumChannel) {
        super(guild, data);
    }
}