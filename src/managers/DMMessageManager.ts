import DMChannel from '../structures/DMChannel';
import DMMessage from '../structures/DMMessage';
import GroupDMChannel from '../structures/GroupDMChannel';

import Collection from '../util/Collection';

type DMBasedChannel =
    | DMChannel
    | GroupDMChannel;

export default class DMMessageManager {
    public cache = new Collection<string, DMMessage>();

    public constructor(private channel: DMBasedChannel) {
        Object.defineProperty(this, 'channel', { enumerable: false });
    }
}