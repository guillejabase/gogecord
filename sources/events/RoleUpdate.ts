import Event from '../classes/Event';
import Role from '../classes/Role';

export default new Event({
    name: 'RoleUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const oldRole = guild.roles.get(data.role.id)!;

        data.role.position = Math.max(...guild.roles.map((role) => role.position)) - data.role.position + 1;

        const newRole = new Role(client, data.role, guild);

        guild.roles.set(newRole.id, newRole);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, oldRole, newRole);
    }
});