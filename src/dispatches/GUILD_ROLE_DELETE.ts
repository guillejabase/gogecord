import { Dispatch } from '../structures/Dispatch';

export default new Dispatch({
  name: 'GUILD_ROLE_DELETE',

  run(c, d) {
    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const role = guild.roles.get(d.role_id);

    if (!role) return;

    guild.roles.delete(role.id);

    c.emit(this.name, role);
  }
});
