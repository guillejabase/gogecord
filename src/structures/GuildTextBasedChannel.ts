import type Types from 'discord-api-types/v10';

import MessageManager from '../managers/MessageManager';

import Guild from './Guild';
import GuildBasedChannel from './GuildBasedChannel';

type APIGuildTextBasedChannel =
    | Types.APIGuildForumChannel
    | Types.APIGuildMediaChannel
    | Types.APIGuildStageVoiceChannel
    | Types.APIGuildVoiceChannel
    | Types.APINewsChannel
    | Types.APITextChannel
    | Types.APIGuildVoiceChannel;

export default class GuildTextBasedChannel extends GuildBasedChannel {
    public messages = new MessageManager(this);

    constructor(guild: Guild, data: APIGuildTextBasedChannel) {
        super(guild, data);
    }
}