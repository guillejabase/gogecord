import type Types from 'discord-api-types/v10';

import Guild from './Guild';
import GuildBasedChannel from './GuildBasedChannel';
import GuildMessageManager from '../managers/GuildMessageManager';

type APIGuildTextBasedChannel =
    | Types.APIGuildForumChannel
    | Types.APIGuildMediaChannel
    | Types.APIGuildStageVoiceChannel
    | Types.APIGuildVoiceChannel
    | Types.APINewsChannel
    | Types.APITextChannel
    | Types.APIGuildVoiceChannel;

export default class GuildTextBasedChannel extends GuildBasedChannel {
    public messages = new GuildMessageManager(this);

    public constructor(guild: Guild, data: APIGuildTextBasedChannel) {
        super(guild, data);
    }
}