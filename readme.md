# gogecord
A lightweight library for interacting with the [Discord API](https://discord.com/developers/docs/intro). Written in TypeScript and compiled to JavaScript, this library provides developers with the necessary tools to create powerful Discord bots quickly and easily.

## Features
- **TypeScript Support**: Fully typed library with TypeScript for better development experience and safety.
- **JavaScript Compatibility**: The library is compiled to JavaScript, making it easy to use in both TypeScript and JavaScript projects.
- **Bot Development**: Ideal for building custom bots that interact with Discord servers efficiently.

## Basic bot
```bash
npm install gogecord
```

# Usage
```js
const { Client } = require('gogecord');

const client = new Client({
    intents: [
        'DirectMessages',
        'GuildEmojisAndStickers',
        'GuildMembers',
        'GuildMessages',
        'GuildPresences',
        'Guilds',
        'MessageContent'
    ]
});

client.on('READY', (client) => {
    client.setPresence({
        activities: [{
            name: 'Gogecord',
            type: 'Watching'
        }],
        status: 'DoNotDisturb'
    });

    console.log('Logged in as', client.user.username);
});
client.on('MESSAGE_CREATE', (message) => {
    const content = message.content.toLowerCase();
    let response;

    if (content === 'hi') {
        response = 'hi!';
    } else if (content === 'bye') {
        response = 'bye!';
    }
    if (response) {
        message.reply({
            content: response
        });
    }
});

client.login('app_token');
```
