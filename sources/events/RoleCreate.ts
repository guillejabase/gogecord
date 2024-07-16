import Event from '../classes/Event';
import Role from '../classes/Role';

export default new Event({
    name: 'RoleCreate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;

        data.role.position = Math.max(...guild.roles.map((role) => role.position)) - data.role.position + 1;

        const role = new Role(client, data.role, guild);

        guild.roles.set(role.id, role);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, role);
    }
});