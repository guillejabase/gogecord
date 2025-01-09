import type { APIGuildVoiceChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';

export default class GuildVoiceChannel extends GuildVoiceBasedChannel {
    public readonly type = 'GuildVoice';

    constructor(guild: Guild, data: APIGuildVoiceChannel) {
        super(guild, data);
    }
}