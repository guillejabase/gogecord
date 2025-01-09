import GuildTextBasedChannel from '../structures/GuildTextBasedChannel';
import Message from '../structures/Message';
import Collection from '../util/Collection';
import Embed from '../util/Embed';
export type MessageOptions = {
    content?: string;
    embeds?: Embed[];
    mentions?: boolean;
    reference?: string;
};
export default class MessageManager {
    private channel;
    cache: Collection<string, Message>;
    constructor(channel: GuildTextBasedChannel);
    send(options: MessageOptions): Promise<Message>;
}
//# sourceMappingURL=MessageManager.d.ts.map