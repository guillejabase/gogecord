import types from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import Embed from '../util/Embed';
export default class Message {
    private client;
    private channelId;
    private memberId;
    content: string;
    created: {
        at: Date;
        timestamp: number;
    };
    guild: Guild;
    id: string;
    constructor(client: Client, data: types.GatewayMessageCreateDispatchData | types.GatewayMessageUpdateDispatchData);
    get channel(): import("./Channel").default;
    get member(): import("./Member").default;
    reply(content: string | Embed): Promise<Message>;
}
