import {
    APIMessage,
    GatewayMessageCreateDispatchData,
    GatewayMessageUpdateDispatchData
} from 'discord-api-types/v10';

import Channel from './Channel';
import Guild from './Guild';

import Embed from '../util/Embed';
import Snowflake from '../util/Snowflake';
import Member from './Member';

export default class Message {
    public channel: Channel;
    public content: string;
    public created: {
        at: Date;
        timestamp: number;
    };
    public edited: {
        since?: Date;
        timestamp?: number;
    };
    public guild!: Guild;
    public id: string;
    public member: Member;

    constructor (data: APIMessage | GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData, guild: Guild) {
        this.guild = guild;
        this.channel = this.guild.channels.cache.get(data.channel_id)!;
        this.content = data.content!;
        this.id = data.id;

        const created = new Snowflake(this.id).timestamp;

        this.created = {
            at: new Date(created),
            timestamp: created
        };

        const edited = Date.parse(data.edited_timestamp!);

        this.edited = {
            since: data.edited_timestamp ? new Date(edited) : undefined,
            timestamp: edited || undefined
        };
        this.member = this.guild.members.cache.get(data.author!.id)!;
    }

    public get ping() {
        return Date.now() - this.created.timestamp;
    }

    public async reply(options: {
        content?: string;
        embeds?: Embed[];
    }): Promise<Message> {
        return await this.guild.channels.send(this.channel, {
            content: options.content,
            embeds: options.embeds,
            reference: this.id
        });
    };
}