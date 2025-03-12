import type { Channel } from '../structures/BasedChannel';
import Client from '../structures/Client';

import Collection from '../util/Collection';

export default class ChannelManager {
    public cache = new Collection<string, Channel>();

    public constructor(private client: Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
    }
}