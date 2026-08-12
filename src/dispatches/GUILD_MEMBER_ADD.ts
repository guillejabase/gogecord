import { Dispatch } from '../structures/Dispatch';
import { GuildMember } from '../structures/GuildMember';

export default new Dispatch({
  name: 'GUILD_MEMBER_ADD',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    c.emit(this.name, new GuildMember(c, guild.id, d));
  }
});
