import Listener from '../classes/Listener';

export default new Listener({
    name: 'MessageDelete',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id!)!;
        const channel = guild.channels.cache.get(data.channel_id)!;
        const message = channel.messages.cache.get(data.id)!;

        channel.messages.cache.delete(data.id);
        guild.channels.cache.set(channel.id, channel);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, message);
        }
    }
});