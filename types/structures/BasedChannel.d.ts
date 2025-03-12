import type { APIChannel } from 'discord-api-types/v10';
import Client from './Client';
import DMChannel from '../structures/DMChannel';
import GroupDMChannel from './GroupDMChannel';
import GuildAnnouncementChannel from '../structures/GuildAnnouncementChannel';
import GuildCategoryChanel from '../structures/GuildCategoryChannel';
import GuildForumChannel from '../structures/GuildForumChannel';
import GuildMediaChannel from '../structures/GuildMediaChannel';
import GuildStageVoiceChannel from '../structures/GuildStageVoiceChannel';
import GuildTextChannel from '../structures/GuildTextChannel';
import GuildVoiceChannel from '../structures/GuildVoiceChannel';
import ChannelFlags from '../util/ChannelFlags';
export declare enum ChannelTypes {
    GuildText = 0,
    DM = 1,
    GuildVoice = 2,
    GroupDM = 3,
    GuildCategory = 4,
    GuildAnnouncement = 5,
    GuildAnnouncementThread = 10,
    GuildPublicThread = 11,
    GuildPrivateThread = 12,
    GuildStageVoice = 13,
    GuildDirectory = 14,
    GuildForum = 15,
    GuildMedia = 16
}
export type Channel = DMChannel | GroupDMChannel | GuildAnnouncementChannel | GuildCategoryChanel | GuildForumChannel | GuildMediaChannel | GuildStageVoiceChannel | GuildTextChannel | GuildVoiceChannel;
export type ChannelType = keyof typeof ChannelTypes;
export default class BasedChannel {
    client: Client;
    created: {
        at: Date;
        timestamp: number;
    };
    flags: ChannelFlags;
    id: string;
    readonly type: ChannelType;
    constructor(client: Client, data: APIChannel);
    toString(): string;
}
//# sourceMappingURL=BasedChannel.d.ts.map