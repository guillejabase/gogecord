import type Types from 'discord-api-types/v10';

import BasedChannel from './BasedChannel';
import Guild from './Guild';
import GuildCategoryChanel from './GuildCategoryChannel';
import GuildForumChannel from './GuildForumChannel';
import GuildMediaChannel from './GuildMediaChannel';
import GuildStageVoiceChannel from './GuildStageVoiceChannel';
import GuildTextBasedChannel from './GuildTextBasedChannel';
import GuildTextChannel from './GuildTextChannel';
import GuildThreadChannel from './GuildThreadChannel';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';
import GuildVoiceChannel from './GuildVoiceChannel';

type APIGuildBasedChannel =
    | Types.APIGuildCategoryChannel
    | Types.APIGuildForumChannel
    | Types.APIGuildMediaChannel
    | Types.APIGuildStageVoiceChannel
    | Types.APIGuildVoiceChannel
    | Types.APINewsChannel
    | Types.APITextChannel
    | Types.APIThreadChannel;
export type GuildChannel =
    | GuildCategoryChanel
    | GuildForumChannel
    | GuildMediaChannel
    | GuildStageVoiceChannel
    | GuildTextChannel
    | GuildThreadChannel
    | GuildVoiceChannel;

export default class GuildBasedChannel extends BasedChannel {
    public name: string;

    public constructor(public guild: Guild, data: APIGuildBasedChannel) {
        super(guild.client, data);

        this.name = data.name;

        Object.defineProperty(this, 'guild', { enumerable: false });
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