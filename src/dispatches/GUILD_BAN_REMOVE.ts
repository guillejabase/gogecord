import { Dispatch } from '../structures/Dispatch';
import { GuildBan } from '../structures/GuildBan';

export default new Dispatch({
  name: 'GUILD_BAN_REMOVE',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const ban = guild.bans.get(d.user.id) ?? new GuildBan(c, guild.id, { reason: null, user: d.user });

    guild.bans.delete(d.user.id);

    c.emit(this.name, ban);
  }
});
