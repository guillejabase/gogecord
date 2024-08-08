import Listener from '../classes/Listener';
import Message from '../classes/Message';

export default new Listener({
    name: 'MessageCreate',

    run(client, data) {
        if (data.author.bot) {
            return;
        }

        const message = new Message(data, client.guilds.get(data.guild_id!)!);

        message.guild.channels.cache.set(message.channel.id, message.channel);
        client.guilds.set(message.guild.id, message.guild);

        if (client.events.get(this.name)) {
            client.emit(this.name, client, message);
        }
    }
});