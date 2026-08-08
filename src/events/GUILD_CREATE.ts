import { Dispatch } from '../structures/Dispatch';
import { Guild } from '../structures/Guild';

export default new Dispatch({
  name: 'GUILD_CREATE',

  run(c, d) {
    c.emit(this.name, new Guild(c, d));
  }
});
