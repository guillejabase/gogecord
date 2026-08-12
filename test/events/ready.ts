import { Event } from '../..';

export default new Event({
  name: 'READY',

  async run(c) {
    console.log(`Logged in as ${c.user.username}#${c.user.discriminator}`);

    c.gateway.setPresence({
      activities: [{
        name: 'Gogecord',
        type: 'Playing'
      }],
      status: 'online'
    });

    try {
      await c.registerCommands();
    } catch (error) {
      console.error('Failed to register commands:', error);
    }
  }
});
