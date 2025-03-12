import GatewayEvent from '../structures/GatewayEvent';

export default new GatewayEvent({
    name: 'GUILD_DELETE',

    run(client, data) {
        const guild = client.guilds.cache.get(data.id)!;

        client.guilds.cache.delete(guild.id);

        client.emit(this.name, guild);
    }
});