import Event from '../classes/Event';
import Presence from '../classes/Presence';

export default new Event({
    name: 'PresenceUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const member = guild.members.get(data.user.id)!;
        const oldPresence = member.presence;
        const newPresence = new Presence(data);

        member.presence = newPresence;

        guild.members.set(member.user.id, member);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, oldPresence, newPresence);
    }
});