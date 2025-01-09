import GatewayEvent from '../structures/GatewayEvent';
import GuildRole from '../structures/GuildRole';

export default new GatewayEvent({
    name: 'GUILD_ROLE_CREATE',

    run: (client, data) => {
        client.emit('GuildRoleCreate', new GuildRole(client.guilds.cache.get(data.guild_id)!, data.role));
    }
});