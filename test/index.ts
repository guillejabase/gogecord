import { Client, Command } from '..';

const token = Bun.env['APP_TOKEN'];

if (!token) {
  throw new Error('App token is missing from your .env file');
}

const client = new Client({
  intents: ['GuildMembers', 'GuildPresences', 'Guilds'],
});
const ping = new Command({
  data: {
    name: 'ping',
    description: 'Replies with pong and latency info',
  },

  async run(i) {
    await i.reply({ content: 'pong' });
  }
});

client.commands.set(ping.data.name, ping);

client.on('READY', async (c) => {
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
});

client.login(token);
