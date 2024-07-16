import Event from '../classes/Event';
import Message from '../classes/Message';

export default new Event({
    name: 'MessageCreate',

    run(client, data) {
        if (data.author.bot) {
            return;
        }

        const guild = client.guilds.get(data.guild_id!)!;
        const channel = guild.channels.get(data.channel_id)!;
        const message = new Message(client, data);

        channel.messages.set(message.id, message);
        guild.channels.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, message);
    }
});