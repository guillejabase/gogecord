import { Dispatch } from '../structures/Dispatch';
import { Presence } from '../structures/Presence';

export default new Dispatch({
  name: 'PRESENCE_UPDATE',

  run(c, d) {
    const presence = c.presences.get(d.user.id);

    if (!presence) {
      new Presence(c, d);
      return;
    }

    const old = Object.assign(Object.create(Object.getPrototypeOf(presence)), presence);
    const updated = new Presence(c, d);

    c.emit(this.name, old, updated);
  }
});
