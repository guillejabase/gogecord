import type { APIChannel } from 'discord-api-types/v10';
import Client from './Client';
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
export type ChannelType = keyof typeof ChannelTypes;
export default class Channel {
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
//# sourceMappingURL=Channel.d.ts.map