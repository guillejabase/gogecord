import { Dispatch } from '../structures/Dispatch';

export default new Dispatch({
  name: 'CHANNEL_DELETE',

  run(c, d) {
    if (!('guild_id' in d) || !d.guild_id) return;

    const guild = c.guilds.get(d.guild_id);

    if (!guild) return;

    const channel = guild.channels.get(d.id);

    if (!channel) return;

    guild.channels.delete(channel.id);

    c.emit(this.name, channel);
  }
});
