import GuildMessage from '../structures/GuildMessage';
import GuildTextBasedChannel from '../structures/GuildTextBasedChannel';

import Collection from '../util/Collection';

export default class GuildMessageManager {
    public cache = new Collection<string, GuildMessage>();

    public constructor(private channel: GuildTextBasedChannel) {
        Object.defineProperty(this, 'channel', { enumerable: false });
    }
}