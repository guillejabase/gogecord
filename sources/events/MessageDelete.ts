import Event from '../classes/Event';

export default new Event({
    name: 'MessageDelete',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id!)!;
        const channel = guild.channels.get(data.channel_id)!;
        const message = channel.messages.get(data.id)!;

        channel.messages.delete(data.id);
        guild.channels.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, message);
    }
});