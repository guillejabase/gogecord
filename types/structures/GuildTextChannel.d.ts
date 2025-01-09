import type { APITextChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';
export default class GuildTextChannel extends GuildTextBasedChannel {
    readonly type = "GuildText";
    constructor(guild: Guild, data: APITextChannel);
}
//# sourceMappingURL=GuildTextChannel.d.ts.map