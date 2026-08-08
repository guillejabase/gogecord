import { Dispatch } from '../structures/Dispatch';
import { Guild } from '../structures/Guild';

export default new Dispatch({
  name: 'GUILD_UPDATE',

  run(c, d) {
    const guild = c.guilds.get(d.id);

    if (!guild) {
      new Guild(c, d);
      return;
    }

    const old = Object.assign(Object.create(Object.getPrototypeOf(guild)), guild);
    const updated = new Guild(c, d);

    c.emit(this.name, old, updated);
  }
});
