import type Types from 'discord-api-types/v10';

import Channel from './Channel';
import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';

type APIGuildBasedChannel =
    | Types.APIGuildCategoryChannel
    | Types.APIGuildForumChannel
    | Types.APIGuildMediaChannel
    | Types.APIGuildStageVoiceChannel
    | Types.APIGuildVoiceChannel
    | Types.APINewsChannel
    | Types.APITextChannel
    | Types.APIGuildVoiceChannel;

export default class GuildBasedChannel extends Channel {
    constructor(public guild: Guild, data: APIGuildBasedChannel) {
        super(guild.client, data);
    }

    public isGuildTextBased(): this is GuildTextBasedChannel {
        return [
            'GuildText',
            'GuildAnnouncement',
            'GuildAnnouncementThread',
            'GuildPublicThread',
            'GuildPrivateThread',
            'GuildForum',
            'GuildMedia'
        ].includes(this.type);
    }
    public isGuildVoiceBased(): this is GuildVoiceBasedChannel {
        return [
            'GuildVoice',
            'GuildStageVoice'
        ].includes(this.type);
    }
}