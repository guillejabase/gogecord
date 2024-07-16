import Event from '../classes/Event';

export default new Event({
    name: 'ChannelDelete',

    run(client, data) {
        const guild = client.guilds.find((guild) => !!guild.channels.get(data.id))!;
        const channel = guild.channels.get(data.id)!;

        guild.channels.delete(channel.id);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, channel);
    }
});