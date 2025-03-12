import GatewayEvent from '../structures/GatewayEvent';
import GuildMember from '../structures/GuildMember';

export default new GatewayEvent({
    name: 'GUILD_MEMBER_UPDATE',

    run(client, data) {
        const guild = client.guilds.cache.get(data.guild_id)!;
        const oldMember = guild.members.cache.get(data.user.id)!;

        client.emit(this.name, oldMember, new GuildMember(guild, {
            ...data,
            presence: oldMember.presence
        }));
    }
});