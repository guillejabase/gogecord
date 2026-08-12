import { Dispatch } from '../structures/Dispatch';

export default new Dispatch({
  name: 'GUILD_DELETE',

  run(c, d) {
    const guild = c.guilds.get(d.id);

    if (!guild) return;

    c.guilds.delete(guild.id);

    c.emit(this.name, guild);
  }
});
