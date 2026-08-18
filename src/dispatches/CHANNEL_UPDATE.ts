import { Dispatch } from '../structures/Dispatch';

import { ChannelFactory } from '../util/ChannelFactory';

export default new Dispatch({
  name: 'CHANNEL_UPDATE',

  run(c, d) {
    if (!('guild_id' in d) || !d.guild_id) return;

    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const channel = guild.channels.get(d.id);

    if (!channel) {
      ChannelFactory.create(c, guild.id, d);
      return;
    }

    const old = Object.assign(Object.create(Object.getPrototypeOf(channel)), channel);
    const updated = ChannelFactory.create(c, guild.id, d);

    c.emit(this.name, old, updated);
  }
});
