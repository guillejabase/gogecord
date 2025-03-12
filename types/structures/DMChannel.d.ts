import { type APIDMChannel } from 'discord-api-types/v10';
import BasedChannel from './BasedChannel';
import Client from './Client';
import User from './User';
export default class DMChannel extends BasedChannel {
    recipient: User;
    readonly type = "DM";
    constructor(client: Client, data: APIDMChannel);
}
//# sourceMappingURL=DMChannel.d.ts.map