import type { APIThreadChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildBasedChannel from './GuildBasedChannel';

export default class GuildThreadChannel extends GuildBasedChannel {
    public constructor(guild: Guild, data: APIThreadChannel) {
        super(guild, data);
    }
}