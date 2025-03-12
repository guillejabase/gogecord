import DMChannel from '../structures/DMChannel';
import DMMessage from '../structures/DMMessage';
import GroupDMChannel from '../structures/GroupDMChannel';
import Collection from '../util/Collection';
type DMBasedChannel = DMChannel | GroupDMChannel;
export default class DMMessageManager {
    private channel;
    cache: Collection<string, DMMessage>;
    constructor(channel: DMBasedChannel);
}
export {};
//# sourceMappingURL=DMMessageManager.d.ts.map