import type { APINewsChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';

export default class GuildAnnouncementChannel extends GuildTextBasedChannel {
    public readonly type = 'GuildAnnouncement';

    constructor(guild: Guild, data: APINewsChannel) {
        super(guild, data);
    }
}