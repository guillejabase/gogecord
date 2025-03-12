import type { APIThreadChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildBasedChannel from './GuildBasedChannel';
export default class GuildThreadChannel extends GuildBasedChannel {
    constructor(guild: Guild, data: APIThreadChannel);
}
//# sourceMappingURL=GuildThreadChannel.d.ts.map