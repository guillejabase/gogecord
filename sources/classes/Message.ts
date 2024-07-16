import types from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import Snowflake from '../util/Snowflake';
import Embed from '../util/Embed';

export default class Message {
    private client: Client;
    private channelId: string;
    private memberId: string;

    content: string;
    created: {
        at: Date;
        timestamp: number;
    };
    guild!: Guild;
    id: string;

    constructor (
        client: Client,
        data: types.GatewayMessageCreateDispatchData | types.GatewayMessageUpdateDispatchData
    ) {
        this.channelId = data.channel_id;
        this.client = client;
        this.content = data.content!;

        if ('guild_id' in data) {
            this.guild = this.client.guilds.get(data.guild_id!)!;
        }
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };

        this.memberId = data.author!.id;

        Object.defineProperties(this, {
            client: { enumerable: false },
            channelId: { enumerable: false },
            guild: { enumerable: false },
            memberId: { enumerable: false }
        });
    }

    get channel() {
        return this.guild.channels.get(this.channelId)!;
    }

    get member() {
        return this.guild.members.get(this.memberId)!;
    }

    reply(content: string | Embed) {
        return this.channel.send(content, this.id);
    }
}