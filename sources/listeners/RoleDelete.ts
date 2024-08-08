import Listener from '../classes/Listener';

export default new Listener({
    name: 'RoleDelete',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const role = guild.roles.cache.get(data.role_id)!;

        for (const member of guild.members.cache.values()) {
            if (member.roles.cache.has(role.id)) {
                member.roles.cache.delete(role.id);
            }
        }

        guild.roles.cache.delete(role.id);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, role);
        }
    }
});