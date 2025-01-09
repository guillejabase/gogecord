import type { APIGuildVoiceChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import GuildVoiceBasedChannel from './GuildVoiceBasedChannel';
export default class GuildVoiceChannel extends GuildVoiceBasedChannel {
    readonly type = "GuildVoice";
    constructor(guild: Guild, data: APIGuildVoiceChannel);
}
//# sourceMappingURL=GuildVoiceChannel.d.ts.map