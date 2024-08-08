import Channel from '../classes/Channel';
import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Message from '../classes/Message';
import Collection from '../util/Collection';
export default class MessageManager {
    private channel;
    private client;
    private guild;
    cache: Collection<string, Message>;
    constructor(channel: Channel, client: Client, guild: Guild);
    fetch(message: Message): Promise<Message>;
}
