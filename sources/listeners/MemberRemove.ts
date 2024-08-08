import Listener from '../classes/Listener';

export default new Listener({
    name: 'MemberRemove',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const member = guild.members.cache.get(data.user.id)!;

        guild.members.cache.delete(member.user.id);
        client.guilds.set(guild.id, guild);

        if (client.events.has(this.name)) {
            client.emit(this.name, client, member);
        }
    }
});