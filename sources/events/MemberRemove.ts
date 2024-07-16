import Event from '../classes/Event';

export default new Event({
    name: 'MemberRemove',

    run(client, data) {
        const guild = client.guilds.get(data.guild_id)!;
        const member = guild.members.get(data.user.id)!;

        guild.members.delete(member.user.id);
        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, member);
    }
});