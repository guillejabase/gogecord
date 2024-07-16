import Event from '../classes/Event';
import Member from '../classes/Member';

export default new Event({
    name: 'MemberUpdate',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const oldMember = guild.members.get(data.user.id)!;
        const presence = oldMember.presence;
        const newMember = new Member(client, data, guild, presence);

        guild.members.set(newMember.user.id, newMember);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, oldMember, newMember);
    }
});