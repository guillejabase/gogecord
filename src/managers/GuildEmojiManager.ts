import { Routes } from 'discord-api-types/v10';

import Guild from '../structures/Guild';
import Emoji from '../structures/Emoji';

import Collection from '../util/Collection';

export default class GuildEmojiManager {
    public cache = new Collection<string, Emoji>();

    constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
}