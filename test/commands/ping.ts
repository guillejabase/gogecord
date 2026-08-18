import { Command } from '../../src/index';

export default new Command({
  data: {
    name: 'ping',
    description: 'Replies with pong and latency info'
  },

  run(i) {
    i.reply({ content: `Pong! ${i.client.gateway.ping}ms` });
  }
});
