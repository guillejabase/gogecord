import Listener from '../classes/Listener';

export default new Listener({
    name: 'ChannelDelete',

    run(client, data) {
        const guild = client.guilds.find((guild) => !!guild.channels.cache.get(data.id))!;
        const channel = guild.channels.cache.get(data.id)!;

        guild.channels.cache.delete(channel.id);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, channel);
        }
    }
});