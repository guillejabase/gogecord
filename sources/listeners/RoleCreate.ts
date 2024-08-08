import Listener from '../classes/Listener';
import Role from '../classes/Role';

export default new Listener({
    name: 'RoleCreate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;

        data.role.position = Math.max(...guild.roles.cache.map((role) => role.position)) - data.role.position + 1;

        const role = new Role(data.role, guild);

        guild.roles.cache.set(role.id, role);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, role);
        }
    }
});