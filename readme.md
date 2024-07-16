# Gogecord
A Discord API interaction library, coded in TypeScript and compiled in JavaScript.

## Installation
Execute `npm install gogecord .env ts-node` in Command Prompt. 

.env file:
```
token = APP_TOKEN
```

tsconfig.json file:
```json
{
    "compilerOptions": {
       "target": "es2016",
       "module": "commonjs",
       "resolveJsonModule": true,
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true
    }
    "exclude": ["node_modules"]
    "include": ["sources"]
}
```

sources/index.ts file:
```ts
import dotenv from 'dotenv';
import gogecord from 'gogecord';

dotenv.config();

const client = new gogecord.Client({
    intents: [
        'DirectMessages',
        'GuildMembers',
        'GuildMessages',
        'GuildPresences',
        'Guilds',
        'MessageContent'
    ],
    token: process.env.token
});

client.on('Ready', (client) => {
    console.log('Bot ready. Username ->', client.user.username);
});
client.on('MessageCreate', (client, message) => {
    if (message.content == 'hello, bot!') {
        message.reply('hello!');
    }
});
```

And run the file executing `npx ts-node sources/index`.