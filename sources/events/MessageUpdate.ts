import Event from '../classes/Event';
import Message from '../classes/Message';

export default new Event({
    name: 'MessageUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id!)!;
        const channel = guild.channels.get(data.channel_id)!;
        const oldMessage = channel.messages.get(data.id)!;
        const newMessage = new Message(client, data);

        channel.messages.set(newMessage.id, newMessage);
        guild.channels.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, oldMessage, newMessage);
    }
});