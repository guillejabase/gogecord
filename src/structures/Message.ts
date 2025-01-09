import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';

import type { MessageOptions } from '../managers/MessageManager';

import Client from './Client';
import GuildTextBasedChannel from './GuildTextBasedChannel';
import User from './User';

import MessageFlags from '../util/MessageFlags';
import DMChannel from './DMChannel';

export default class Message {
    public author: User;
    // public channel: any;
    public content: string;
    public created: {
        at: Date;
        timestamp: number;
    };
    public edited: {
        since?: Date;
        timestamp?: number;
    };
    public flags: MessageFlags;
    public id: string;

    constructor(public client: Client, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData) {
        this.author = client.users.cache.get(data.author.id)!;
        // this.channel = client.channels.cache.get(data.channel_id)! as DMChannel | GuildTextBasedChannel;
        this.content = data.content;

        const created = Date.parse(data.timestamp);
        this.created = {
            at: new Date(created),
            timestamp: created
        };

        const edited = Date.parse(data.edited_timestamp!) || undefined;
        this.edited = edited ? {
            since: new Date(edited),
            timestamp: edited
        } : {};

        this.flags = new MessageFlags(data.flags!);
        this.id = data.id;

        Object.defineProperty(this, 'client', { enumerable: false });
    }

    // public async reply(options: Omit<MessageOptions, 'reference'>): Promise<Message> {
    //     return await this.channel.messages.send({
    //         ...options,
    //         reference: this.id
    //     });
    // }
}