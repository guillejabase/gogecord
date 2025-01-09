import { Routes } from 'discord-api-types/v10';

import GuildTextBasedChannel from '../structures/GuildTextBasedChannel';
import Message from '../structures/Message';

import Collection from '../util/Collection';
import Embed from '../util/Embed';

export type MessageOptions = {
    content?: string;
    embeds?: Embed[];
    mentions?: boolean;
    reference?: string;
};

export default class MessageManager {
    public cache = new Collection<string, Message>();

    constructor(private channel: GuildTextBasedChannel) {
        Object.defineProperty(this, 'channel', { enumerable: false });
    }

    public async send(options: MessageOptions): Promise<Message> {
        return new Message(this.channel.client, await this.channel.client.request({
            method: 'post',
            path: Routes.channelMessages(this.channel.id),
            body: {
                allowed_mentions: {
                    replied_user: options.mentions != undefined ? options.mentions : this.channel.client.mentions
                },
                content: options.content || undefined,
                embeds: options.embeds || undefined,
                message_reference: options.reference ? {
                    message_id: options.reference
                } : undefined
            }
        }));
    }
}