import Event from '../classes/Event';

export default new Event({
    name: 'RoleDelete',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const role = guild.roles.get(data.role_id)!;

        for (const member of guild.members.values()) {
            if (member.roles.has(role.id)) {
                member.roles.delete(role.id);
            }
        }

        guild.roles.delete(role.id);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, role);
    }
});