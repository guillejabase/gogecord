import Listener from '../classes/Listener';
import Member from '../classes/Member';
import Presence from '../classes/Presence';

export default new Listener({
    name: 'MemberAdd',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const member = new Member(client, data, guild, new Presence());

        client.users.cache.set(member.user.id, member.user);
        guild.members.cache.set(member.user.id, member);

        if (client.events.get(this.name)) {
            client.emit(this.name, client, member);
        }
    }
});