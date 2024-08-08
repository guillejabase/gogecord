import Listener from '../classes/Listener';
import Member from '../classes/Member';

export default new Listener({
    name: 'MemberUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const oldMember = guild.members.cache.get(data.user.id)!;
        const newMember = new Member(client, data, guild, oldMember.presence);

        guild.members.cache.set(newMember.user.id, newMember);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, oldMember, newMember);
        }
    }
});