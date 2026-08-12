import { Command } from '../..';

export default new Command({
  data: {
    name: 'ping',
    description: 'Replies with pong and latency info'
  },

  run(i) {
    i.reply({ content: 'pong' });
  }
});
