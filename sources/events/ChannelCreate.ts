import Event from '../classes/Event';
import Channel from '../classes/Channel';

export default new Event({
    name: 'ChannelCreate',

    run(client, data) {
        const guild = client.guilds.find((guild) => !!guild.channels.get(data.id))!;
        const channel = new Channel(client, data, guild);

        guild.channels.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, channel);
    }
});