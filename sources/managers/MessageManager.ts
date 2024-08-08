import Channel from '../classes/Channel';
import Client from '../classes/Client';
import Guild from '../classes/Guild';
import Message from '../classes/Message';

import Collection from '../util/Collection';

export default class MessageManager {
    private channel: Channel;
    private client: Client;
    private guild: Guild;

    public cache = new Collection<string, Message>();

    constructor (channel: Channel, client: Client, guild: Guild) {
        this.channel = channel;
        this.client = client;
        this.guild = guild;

        Object.defineProperties(this, {
            channel: { enumerable: false },
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }

    public async fetch(message: Message): Promise<Message> {
        return new Message(await this.client.request('get', `/channels/${this.channel.id}/messages/${message.id}`), this.guild);
    }
}