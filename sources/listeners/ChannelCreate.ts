import Channel from '../classes/Channel';
import Listener from '../classes/Listener';

export default new Listener({
    name: 'ChannelCreate',

    run(client, data) {
        const guild = client.guilds.find((guild) => !!guild.channels.cache.get(data.id))!;
        const channel = new Channel(data, guild);

        guild.channels.cache.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, channel);
        }
    }
});