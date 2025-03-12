import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';
import BasedMessage from './BasedMessage';
import Client from './Client';
import User from './User';
export default class DMMessage extends BasedMessage {
    author: User;
    constructor(client: Client, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData);
}
//# sourceMappingURL=DMMessage.d.ts.map