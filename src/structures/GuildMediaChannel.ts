import type { APIGuildMediaChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';

export default class GuildMediaChannel extends GuildTextBasedChannel {
    public readonly type = 'GuildMedia';

    public constructor(guild: Guild, data: APIGuildMediaChannel) {
        super(guild, data);
    }
}