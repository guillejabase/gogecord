import Listener from '../classes/Listener';

export default new Listener({
    name: 'BanRemove',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const ban = guild.bans.cache.get(data.user.id)!;

        guild.bans.cache.delete(ban.user.id);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, ban);
        }
    }
});