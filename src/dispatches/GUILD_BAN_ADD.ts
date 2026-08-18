import { Dispatch } from '../structures/Dispatch';
import { GuildBan } from '../structures/GuildBan';

export default new Dispatch({
  name: 'GUILD_BAN_ADD',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    c.emit(this.name, new GuildBan(c, guild.id, { reason: null, user: d.user }));
  }
});
