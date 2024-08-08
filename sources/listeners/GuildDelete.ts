import Listener from '../classes/Listener';

export default new Listener({
    name: 'GuildDelete',

    run(client, data) {
        const guild = client.guilds.get(data.id)!;

        guild.members.cache.forEach((member) => {
            const id = member.user.id;

            if (!client.guilds.some((guild) => guild.members.cache.has(id))) {
                client.users.cache.delete(id);
            }
        });
        client.guilds.delete(guild.id);

        if (client.events.get(this.name)) {
            client.emit(this.name, client, guild);
        }
    }
});