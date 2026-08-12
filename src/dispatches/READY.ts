import { Dispatch } from '../structures/Dispatch';
import { User } from '../structures/User';

export default new Dispatch({
  name: 'READY',

  run(c, d) {
    c.user = new User(c, d.user);
    c.readyTimestamp = Date.now();

    c.emit(this.name, c);
  }
});
