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
    client: Client;
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
//# sourceMappingURL=BasedMessage.d.ts.map