import type { APIGroupDMChannel } from 'discord-api-types/v10';

import BasedChannel from './BasedChannel';
import Client from './Client';
import User from './User';

import Collection from '../util/Collection';

export default class GroupDMChannel extends BasedChannel {
    public icon?: string;
    public name?: string;
    public readonly type = 'GroupDM';

    public recipients = new Collection<string, User>();

    public constructor(client: Client, data: APIGroupDMChannel) {
        super(client, data);

        this.icon = data.icon || undefined;
        this.name = data.name || undefined;
    }
}