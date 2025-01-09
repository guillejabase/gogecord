import type Types from 'discord-api-types/v10';
import Channel from './Channel';
import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';
type APIGuildBasedChannel = Types.APIGuildCategoryChannel | Types.APIGuildForumChannel | Types.APIGuildMediaChannel | Types.APIGuildStageVoiceChannel | Types.APIGuildVoiceChannel | Types.APINewsChannel | Types.APITextChannel | Types.APIGuildVoiceChannel;
export default class GuildBasedChannel extends Channel {
    guild: Guild;
    constructor(guild: Guild, data: APIGuildBasedChannel);
    isGuildTextBased(): this is GuildTextBasedChannel;
    isGuildVoiceBased(): this is GuildVoiceBasedChannel;
}
export {};
//# sourceMappingURL=GuildBasedChannel.d.ts.map