import type Types from 'discord-api-types/v10';

import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';

type APIGuildVoiceBasedChannel =
    | Types.APIGuildStageVoiceChannel
    | Types.APIGuildVoiceChannel;

export default class GuildVoiceBasedChannel extends GuildTextBasedChannel {
    public constructor(guild: Guild, data: APIGuildVoiceBasedChannel) {
        super(guild, data);
    }
}