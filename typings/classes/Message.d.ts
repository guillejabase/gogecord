import { APIMessage, GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';
import Channel from './Channel';
import Guild from './Guild';
import Embed from '../util/Embed';
import Member from './Member';
export default class Message {
    channel: Channel;
    content: string;
    created: {
        at: Date;
        timestamp: number;
    };
    edited: {
        since?: Date;
        timestamp?: number;
    };
    guild: Guild;
    id: string;
    member: Member;
    constructor(data: APIMessage | GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData, guild: Guild);
    get ping(): number;
    reply(options: {
        content?: string;
        embeds?: Embed[];
    }): Promise<Message>;
}
