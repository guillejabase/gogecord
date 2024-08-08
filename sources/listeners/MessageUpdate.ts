import Listener from '../classes/Listener';
import Message from '../classes/Message';

export default new Listener({
    name: 'MessageUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id!)!;
        const channel = guild.channels.cache.get(data.channel_id)!;
        const oldMessage = channel.messages.cache.get(data.id)!;
        const newMessage = new Message(data, guild);

        channel.messages.cache.set(newMessage.id, newMessage);
        guild.channels.cache.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, oldMessage, newMessage);
        }
    }
});