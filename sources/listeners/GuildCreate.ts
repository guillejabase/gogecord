import Ban from '../classes/Ban';
import Guild from '../classes/Guild';
import Listener from '../classes/Listener';

export default new Listener({
    name: 'GuildCreate',

    run(client, data) {
        const guild = new Guild(client, data);

        client.request('get', `/guilds/${guild.id}/bans`).then((response) => {
            response.forEach((data: any) => {
                const ban = new Ban(data, guild);

                guild.bans.cache.set(ban.user.id, ban);
            });
        });

        client.guilds.set(guild.id, guild);

        if (client.events.get(this.name)) {
            client.emit(this.name, client, guild);
        }
    }
});