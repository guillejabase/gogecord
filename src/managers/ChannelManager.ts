import { Routes } from 'discord-api-types/v10';

import Client from '../structures/Client';
import Channel from '../structures/Channel';

import Collection from '../util/Collection';

export default class ChannelManager {
    public cache = new Collection<string, Channel>();

    constructor(private client: Client) {
        Object.defineProperty(this, 'client', { enumerable: false });
    }
}