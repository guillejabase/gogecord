import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';

import Client from './Client';
import DMMessage from './DMMessage';
import GuildMessage from './GuildMessage';

import Embed from '../util/Embed';
import MessageFlags from '../util/MessageFlags';

export type Message = DMMessage | GuildMessage;
export type MessageOptions = {
    content?: string;
    embeds?: Embed[];
    mentions?: boolean;
    reference?: string;
};

export default class BasedMessage {
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

    public constructor(public client: Client, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData) {
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
}