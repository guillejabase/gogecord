import Ban from '../classes/Ban';
import Listener from '../classes/Listener';

export default new Listener({
    name: 'BanAdd',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;

        client.request('get', `/guilds/${guild.id}/bans/${data.user.id}`).then((response) => {
            const ban = new Ban(response, guild);

            guild.bans.cache.set(ban.user.id, ban);

            if (client.events.has(this.name)) {
                client.emit(this.name, client, ban);
            }
        });
    }
});