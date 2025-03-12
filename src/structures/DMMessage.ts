import type { GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData } from 'discord-api-types/v10';

import BasedMessage from './BasedMessage';
import Client from './Client';
import User from './User';

export default class DMMessage extends BasedMessage {
    public author: User;

    public constructor(client: Client, data: GatewayMessageCreateDispatchData | GatewayMessageUpdateDispatchData) {
        super(client, data);

        this.author = client.users.cache.get(data.author.id)!;
    }
}