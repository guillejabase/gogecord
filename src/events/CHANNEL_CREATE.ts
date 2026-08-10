import { Dispatch } from '../structures/Dispatch';

import { ChannelFactory } from '../util/ChannelFactory';

export default new Dispatch({
  name: 'CHANNEL_CREATE',

  run(c, d) {
    if (!('guild_id' in d) || !d.guild_id) return;

    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const channel = ChannelFactory.create(c, guild.id, d as any);

    guild.channels.set(channel.id, channel);

    c.emit(this.name, channel);
  }
});
