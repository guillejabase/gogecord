import { Routes } from 'discord-api-types/v10';

import PartialApplication from '../structures/PartialApplication';
import Emoji from '../structures/Emoji';

import Collection from '../util/Collection';

export default class ApplicationEmojiManager {
    public cache = new Collection<string, Emoji>();

    constructor(private application: PartialApplication) {
        Object.defineProperty(this, 'application', { enumerable: false });
    }
}