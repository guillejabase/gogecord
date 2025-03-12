import { type APIDMChannel } from 'discord-api-types/v10';

import BasedChannel from './BasedChannel';
import Client from './Client';
import User from './User';

export default class DMChannel extends BasedChannel {
    public recipient: User;
    public readonly type = 'DM';

    public constructor(client: Client, data: APIDMChannel) {
        super(client, data);

        this.recipient = new User(client, data.recipients![0]);
    }
}