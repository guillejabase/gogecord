import Event from '../classes/Event';
import Guild from '../classes/Guild';

export default new Event({
    name: 'GuildCreate',

    run(client, data) {
        const guild = new Guild(client, data);

        client.guilds.set(guild.id, guild);

        client.emit(this.name, client, guild);
    }
});