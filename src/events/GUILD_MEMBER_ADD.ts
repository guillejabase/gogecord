import GatewayEvent from '../structures/GatewayEvent';
import GuildMember from '../structures/GuildMember';

export default new GatewayEvent({
    name: 'GUILD_MEMBER_ADD',

    run: (client, data) => {
        client.emit('GuildMemberAdd', new GuildMember(client.guilds.cache.get(data.guild_id)!, data));
    }
});