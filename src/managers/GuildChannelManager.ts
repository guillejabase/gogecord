import Guild from '../structures/Guild';
import type { GuildChannel } from '../structures/GuildBasedChannel';

import Collection from '../util/Collection';

export default class GuildChannelManager {
    public cache = new Collection<string, GuildChannel>();

    public constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
}