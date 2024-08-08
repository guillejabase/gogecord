# Gogecord
A Discord API interaction library, coded in TypeScript and compiled in JavaScript.

## Installation
Execute `npm install dotenv fs gogecord ts-node` in Command Prompt. 

.env file:
```
token=APP_TOKEN
```

tsconfig.json file:
```json
{
    "compilerOptions": {
       "target": "esnext",
       "module": "commonjs",
       "resolveJsonModule": true,
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true
    },
    "exclude": ["node_modules"],
    "include": ["sources"]
}
```

sources/events:
```ts
// ready.ts

import { Event } from 'gogecord';

export default new Event({
    name: 'Ready',

    run(client) {
        console.log('Bot ready!');
    }
});
```
```ts
// messageCreate.ts

import { Event } from 'gogecord';

export default new Event({
    name: 'MessageCreate',

    run(client, message) {
        if (message.content == 'hi') {
            message.reply({ content: 'Hi!' });
        }
    }
});
```

sources:
```ts
// index.ts

import dotenv from 'dotenv';
import fs from 'fs';

import { Client, Collection, Event, Events } from 'gogecord';

const events = new Collection<keyof Events, Event>();

for (const file of fs.readdirSync('./sources/events')) {
    const event: Event = require(`./events/${file}`).default;

    events.set(event.name, event);
}

new Client({
    intents: [
        'GuildBans',
        'GuildMembers',
        'GuildMessages',
        'GuildPresences',
        'Guilds',
        'MessageContent'
    ],
    token: process.env.token!,
    events: events
});
```

And run the file executing `npx ts-node sources/index`.