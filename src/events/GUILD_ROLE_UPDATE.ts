import { Dispatch } from '../structures/Dispatch';
import { GuildRole } from '../structures/GuildRole';

export default new Dispatch({
  name: 'GUILD_ROLE_UPDATE',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const role = guild.roles.get(d.role.id);

    if (!role) {
      new GuildRole(c, guild.id, d.role);
      return;
    }

    const old = Object.assign(Object.create(Object.getPrototypeOf(role)), role);
    const updated = new GuildRole(c, guild.id, d.role);

    c.emit(this.name, old, updated);
  }
});
