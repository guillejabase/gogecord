import GatewayEvent from '../structures/GatewayEvent';
import Presence from '../structures/Presence';

export default new GatewayEvent({
    name: 'PRESENCE_UPDATE',

    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id)!;
        const member = guild.members.cache.get(data.user.id)!;
        const oldPresence = member.presence;

        member.presence = new Presence(data);

        guild.members.cache.set(member.user.id, member);
        client.guilds.cache.set(guild.id, guild);

        client.emit('PresenceUpdate', oldPresence, member.presence);
    }
});