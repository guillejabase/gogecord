import { Dispatch } from '../structures/Dispatch';

import { ChannelFactory } from '../util/ChannelFactory';

export default new Dispatch({
  name: 'CHANNEL_CREATE',

  run(c, d) {
    if (!('guild_id' in d) || !d.guild_id) return;

    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    c.emit(this.name, ChannelFactory.create(c, guild.id, d));
  }
});
