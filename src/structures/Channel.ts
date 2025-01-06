import type { APIChannel } from 'discord-api-types/v10';

import Client from './Client';

import ChannelFlags from '../util/ChannelFlags';
import Snowflake from '../util/Snowflake';

export enum ChannelTypes {
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
    public created: {
        at: Date;
        timestamp: number;
    };
    public flags: ChannelFlags;
    public id: string;
    public readonly type: ChannelType;

    constructor(public client: Client, data: APIChannel) {
        this.id = data.id;

        const created = new Snowflake(data.id).timestamp;
        this.created = {
            at: new Date(created),
            timestamp: created
        };

        this.flags = new ChannelFlags(data.flags!);
        this.type = Object
            .keys(ChannelTypes)
            .find((key) => {
                ChannelTypes[key as ChannelType] as number === data.type;
            }) as ChannelType;

        Object.defineProperty(this, 'client', { enumerable: false });
    }
}