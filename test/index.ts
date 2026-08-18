import { Client } from '../src/index';
import { join } from 'node:path';

const token = Bun.env['APP_TOKEN'];

if (!token) {
  throw new Error('App token is missing from your .env file');
}

const client = new Client({
  intents: ['GuildMembers', 'GuildPresences', 'Guilds']
});

await client.loadCommands(join(__dirname, 'commands'));
await client.loadEvents(join(__dirname, 'events'));

client.login(token);
