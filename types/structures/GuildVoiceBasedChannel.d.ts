import type Types from 'discord-api-types/v10';
import Guild from './Guild';
import GuildTextBasedChannel from './GuildTextBasedChannel';
type APIGuildVoiceBasedChannel = Types.APIGuildStageVoiceChannel | Types.APIGuildVoiceChannel;
export default class GuildVoiceBasedChannel extends GuildTextBasedChannel {
    constructor(guild: Guild, data: APIGuildVoiceBasedChannel);
}
export {};
//# sourceMappingURL=GuildVoiceBasedChannel.d.ts.map