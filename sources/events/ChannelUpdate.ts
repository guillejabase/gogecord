import Event from '../classes/Event';
import Channel from '../classes/Channel';

export default new Event({
    name: 'ChannelUpdate',

    run(client, data) {
        const guild = client.guilds.find((guild) => !!guild.channels.get(data.id))!;
        const oldChannel = guild.channels.get(data.id)!;
        const newChannel = new Channel(client, data, guild);

        guild.channels.set(newChannel.id, newChannel);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, oldChannel, newChannel);
    }
});