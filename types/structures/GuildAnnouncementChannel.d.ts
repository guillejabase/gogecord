import type { APINewsChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';
export default class GuildAnnouncementChannel extends GuildTextBasedChannel {
    readonly type = "GuildAnnouncement";
    constructor(guild: Guild, data: APINewsChannel);
}
//# sourceMappingURL=GuildAnnouncementChannel.d.ts.map