import types from 'discord-api-types/v10';
import Client from './Client';
import Collection from '../util/Collection';
import Message from './Message';
import Guild from './Guild';
import Snowflake from '../util/Snowflake';
import Embed from '../util/Embed';

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

type ChannelType = keyof typeof ChannelTypes;

export default class Channel {
    private client: Client;
    private guildId: string;

    created: {
        at: Date;
        timestamp: number;
    };
    id: string;
    mention: string;
    name?: string;
    type: ChannelType;
    messages = new Collection<string, Message>();

    constructor (client: Client, data: types.APIChannel, guild: Guild) {
        this.client = client;
        this.guildId = guild.id;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };
        this.mention = `<#${this.id}>`;
        this.name = data.name || undefined;
        this.type = Object.keys(ChannelTypes).find((key) => ChannelTypes[key as ChannelType] == data.type) as ChannelType;

        Object.defineProperties(this, {
            client: { enumerable: false },
            guildId: { enumerable: false },
            messages: { enumerable: false }
        });
    }

    get guild() {
        return this.client.guilds.get(this.guildId)!;
    }

    send(content: string | Embed, reference?: string) {
        return new Promise((resolve: (value: Message) => void) => {
            this.client.api.post(`/channels/${this.id}/messages`, {
                content: typeof content! == 'string' ? content : undefined,
                embeds: typeof content! == 'object' ? [content] : undefined,
                message_reference: reference ? { message_id: reference } : undefined
            }).then((response) => {
                resolve(new Message(this.client, response.data));
            });
        });
    }
}