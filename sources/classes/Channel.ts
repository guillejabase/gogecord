import { APIChannel } from 'discord-api-types/v10';

import Guild from './Guild';
import Message from './Message';

import MessageManager from '../managers/MessageManager';

import Embed from '../util/Embed';
import Snowflake from '../util/Snowflake';

export const ChannelTypes = {
    Text: 0,
    DM: 1,
    Voice: 2,
    GroupDM: 3,
    Category: 4,
    Announcement: 5,
    AnnouncementThread: 10,
    PublicThread: 11,
    PrivateThread: 12,
    StageVoice: 13,
    Directory: 14,
    Forum: 15,
    Media: 16
};

export type ChannelType = keyof typeof ChannelTypes;

export default class Channel {
    public created: {
        at: Date;
        timestamp: number;
    };
    public guild: Guild;
    public id: string;
    public messages!: MessageManager;
    public name: string;
    public type: ChannelType;

    constructor (data: APIChannel, guild: Guild) {
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.guild = guild;
        this.name = data.name!;
        this.type = Object.keys(ChannelTypes).find((key) => ChannelTypes[key as ChannelType] == data.type) as ChannelType;
    }

    public async send(options: {
        content?: string;
        embeds?: Embed[];
        reference?: string;
    }): Promise<Message> {
        return await this.guild.channels.send(this, options);
    };
}