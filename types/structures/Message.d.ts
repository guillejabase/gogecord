import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';
import Client from './Client';
import User from './User';
import MessageFlags from '../util/MessageFlags';
export default class Message {
    client: Client;
    author: User;
    content: string;
    created: {
        at: Date;
        timestamp: number;
    };
    edited: {
        since?: Date;
        timestamp?: number;
    };
    flags: MessageFlags;
    id: string;
    constructor(client: Client, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData);
}
//# sourceMappingURL=Message.d.ts.map