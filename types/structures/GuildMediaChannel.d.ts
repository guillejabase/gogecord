import type { APIGuildMediaChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';
export default class GuildMediaChannel extends GuildTextBasedChannel {
    readonly type = "GuildMedia";
    constructor(guild: Guild, data: APIGuildMediaChannel);
}
//# sourceMappingURL=GuildMediaChannel.d.ts.map