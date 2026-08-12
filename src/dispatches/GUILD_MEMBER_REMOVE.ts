import { Dispatch } from '../structures/Dispatch';

export default new Dispatch({
  name: 'GUILD_MEMBER_REMOVE',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const member = guild.members.get(d.user.id);

    if (!member) return;

    guild.members.delete(member.user.id);

    c.emit(this.name, member);
  }
});
