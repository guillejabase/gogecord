import type { APIDMChannel } from 'discord-api-types/v10';

import Channel from './Channel';
import Client from './Client';

export default class DMChannel extends Channel {
    public readonly type = 'DM';

    constructor(client: Client, data: APIDMChannel) {
        super(client, data);
    }
}