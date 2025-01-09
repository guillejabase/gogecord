import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import GuildBasedChannel from '../structures/GuildBasedChannel';

import Collection from '../util/Collection';

export default class GuildChannelManager {
    public cache = new Collection<string, GuildBasedChannel>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
}