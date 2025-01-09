import GatewayEvent from '../structures/GatewayEvent';
import GuildRole from '../structures/GuildRole';

export default new GatewayEvent({
    name: 'GUILD_ROLE_UPDATE',

    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id)!;

        client.emit('GuildRoleUpdate', guild.roles.cache.get(data.role.id)!, new GuildRole(guild, data.role));
    }
});