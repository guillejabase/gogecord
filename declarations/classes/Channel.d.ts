import types from 'discord-api-types/v10';
import Client from './Client';
import Collection from '../util/Collection';
import Message from './Message';
import Guild from './Guild';
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
type ChannelType = keyof typeof ChannelTypes;
export default class Channel {
    private client;
    private guildId;
    created: {
        at: Date;
        timestamp: number;
    };
    id: string;
    mention: string;
    name?: string;
    type: ChannelType;
    messages: Collection<string, Message>;
    constructor(client: Client, data: types.APIChannel, guild: Guild);
    get guild(): Guild;
    send(content: string | Embed, reference?: string): Promise<Message>;
}
export {};
