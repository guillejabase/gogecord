import Listener from '../classes/Listener';
import Presence from '../classes/Presence';

export default new Listener({
    name: 'PresenceUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const member = guild.members.cache.get(data.user.id)!;
        const oldPresence = member.presence;
        const newPresence = new Presence(data);

        member.presence = newPresence;

        guild.members.cache.set(member.user.id, member);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, oldPresence, newPresence);
        }
    }
});