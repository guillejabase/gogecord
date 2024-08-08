import { APIChannel } from 'discord-api-types/v10';
import Guild from './Guild';
import Message from './Message';
import MessageManager from '../managers/MessageManager';
import Embed from '../util/Embed';
export declare const ChannelTypes: {
    Text: number;
    DM: number;
    Voice: number;
    GroupDM: number;
    Category: number;
    Announcement: number;
    AnnouncementThread: number;
    PublicThread: number;
    PrivateThread: number;
    StageVoice: number;
    Directory: number;
    Forum: number;
    Media: number;
};
export type ChannelType = keyof typeof ChannelTypes;
export default class Channel {
    created: {
        at: Date;
        timestamp: number;
    };
    guild: Guild;
    id: string;
    messages: MessageManager;
    name: string;
    type: ChannelType;
    constructor(data: APIChannel, guild: Guild);
    send(options: {
        content?: string;
        embeds?: Embed[];
        reference?: string;
    }): Promise<Message>;
}
