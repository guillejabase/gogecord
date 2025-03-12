import GuildMessage from '../structures/GuildMessage';
import GuildTextBasedChannel from '../structures/GuildTextBasedChannel';
import Collection from '../util/Collection';
export default class GuildMessageManager {
    private channel;
    cache: Collection<string, GuildMessage>;
    constructor(channel: GuildTextBasedChannel);
}
//# sourceMappingURL=GuildMessageManager.d.ts.map