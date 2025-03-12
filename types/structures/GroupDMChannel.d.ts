import type { APIGroupDMChannel } from 'discord-api-types/v10';
import BasedChannel from './BasedChannel';
import Client from './Client';
import User from './User';
import Collection from '../util/Collection';
export default class GroupDMChannel extends BasedChannel {
    icon?: string;
    name?: string;
    readonly type = "GroupDM";
    recipients: Collection<string, User>;
    constructor(client: Client, data: APIGroupDMChannel);
}
//# sourceMappingURL=GroupDMChannel.d.ts.map