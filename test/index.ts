import { Client } from '..';

const token = Bun.env['APP_TOKEN'];

if (!token) {
  throw new Error('App token is missing from your .env file');
}

const client = new Client({
  intents: ['GuildMembers', 'GuildPresences', 'Guilds'],
});

client.on('READY', (c) => {
  c.gateway.setPresence({
    activities: [{
      name: 'gogecord',
      type: 'Playing'
    }],
    status: 'online'
  });
});

client.login(token);
