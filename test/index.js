const { Client } = require('..');

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

process.loadEnvFile();

client.login(process.env.TOKEN);