import Event from '../classes/Event';

export default new Event({
    name: 'GuildDelete',

    run(client, data) {
        const guild = client.guilds.get(data.id)!;

        guild.members.forEach((member) => {
            const id = member.user.id;

            if (!client.guilds.some((guild) => guild.members.has(id))) {
                client.users.delete(id);
            }
        });
        client.guilds.delete(guild.id);

        client.emit(this.name, client, guild);
    }
});