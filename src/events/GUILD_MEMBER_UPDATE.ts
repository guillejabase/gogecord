import { Dispatch } from '../structures/Dispatch';
import { GuildMember } from '../structures/GuildMember';

export default new Dispatch({
  name: 'GUILD_MEMBER_UPDATE',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const member = guild.members.get(d.user.id);

    if (!member) {
      new GuildMember(c, guild.id, d);
      return;
    }

    const old = Object.assign(Object.create(Object.getPrototypeOf(member)), member);
    const updated = new GuildMember(c, guild.id, d);

    c.emit(this.name, old, updated);
  }
});
