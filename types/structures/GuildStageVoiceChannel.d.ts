import type { APIGuildStageVoiceChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';
export default class GuildStageVoiceChannel extends GuildVoiceBasedChannel {
    readonly type = "GuildStageVoice";
    constructor(guild: Guild, data: APIGuildStageVoiceChannel);
}
//# sourceMappingURL=GuildStageVoiceChannel.d.ts.map