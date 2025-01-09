import type { APIGuildStageVoiceChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';

export default class GuildStageVoiceChannel extends GuildVoiceBasedChannel {
    public readonly type = 'GuildStageVoice';

    constructor(guild: Guild, data: APIGuildStageVoiceChannel) {
        super(guild, data);
    }
}