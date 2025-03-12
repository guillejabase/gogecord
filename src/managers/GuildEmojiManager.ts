import Guild from '../structures/Guild';
import Emoji from '../structures/Emoji';

import Collection from '../util/Collection';

export default class GuildEmojiManager {
    public cache = new Collection<string, Emoji>();

    public constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
}