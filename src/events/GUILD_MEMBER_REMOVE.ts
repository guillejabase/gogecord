import GatewayEvent from '../structures/GatewayEvent';

export default new GatewayEvent({
    name: 'GUILD_MEMBER_REMOVE',

    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id)!;
        const member = guild.members.cache.get(data.user.id)!;

        guild.members.cache.delete(member.user.id);
        client.guilds.cache.set(guild.id, guild);

        client.emit('GuildMemberRemove', member);
    }
});