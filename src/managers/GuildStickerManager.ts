import Guild from '../structures/Guild';
import Sticker from '../structures/Sticker';

import Collection from '../util/Collection';

export default class GuildStickerManager {
    public cache = new Collection<string, Sticker>();

    public constructor(private guild: Guild) {
        Object.defineProperty(this, 'guild', { enumerable: false });
    }
}