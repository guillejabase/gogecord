import Event from '../classes/Event';
import Member from '../classes/Member';
import Presence from '../classes/Presence';

export default new Event({
    name: 'MemberAdd',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const member = new Member(client, data, guild, new Presence(undefined));

        guild.members.set(member.user.id, member);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, member);
    }
});