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
type APIGuildBasedChannel = Types.APIGuildCategoryChannel | Types.APIGuildForumChannel | Types.APIGuildMediaChannel | Types.APIGuildStageVoiceChannel | Types.APIGuildVoiceChannel | Types.APINewsChannel | Types.APITextChannel | Types.APIThreadChannel;
export type GuildChannel = GuildCategoryChanel | GuildForumChannel | GuildMediaChannel | GuildStageVoiceChannel | GuildTextChannel | GuildThreadChannel | GuildVoiceChannel;
export default class GuildBasedChannel extends BasedChannel {
    guild: Guild;
    name: string;
    constructor(guild: Guild, data: APIGuildBasedChannel);
    isGuildTextBased(): this is GuildTextBasedChannel;
    isGuildVoiceBased(): this is GuildVoiceBasedChannel;
}
export {};
//# sourceMappingURL=GuildBasedChannel.d.ts.map