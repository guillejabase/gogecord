import Channel from '../classes/Channel';
import Listener from '../classes/Listener';

export default new Listener({
    name: 'ChannelUpdate',

    run(client, data) {
        const guild = client.guilds.find((guild) => !!guild.channels.cache.get(data.id))!;
        const oldChannel = guild.channels.cache.get(data.id)!;
        const newChannel = new Channel(data, guild);

        guild.channels.cache.set(newChannel.id, newChannel);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, oldChannel, newChannel);
        }
    }
});