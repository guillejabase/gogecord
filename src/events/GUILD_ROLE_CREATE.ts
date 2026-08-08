import { Dispatch } from '../structures/Dispatch';
import { GuildRole } from '../structures/GuildRole';

export default new Dispatch({
  name: 'GUILD_ROLE_CREATE',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    c.emit(this.name, new GuildRole(c, guild.id, d.role));
  }
});
