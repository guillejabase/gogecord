import GatewayEvent from '../structures/GatewayEvent';
import GuildEmoji from '../structures/GuildEmoji';

export default new GatewayEvent({
    name: 'GUILD_EMOJIS_UPDATE',

    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id)!;
        const created: GuildEmoji[] = [];
        const updated: GuildEmoji[] = [];
        const deleted: GuildEmoji[] = [];

        for (const apiEmoji of data.emojis) {
            const existing = guild.emojis.cache.get(apiEmoji.id!);

            if (existing) {
                updated.push(new GuildEmoji(client, guild, apiEmoji));
            } else {
                created.push(new GuildEmoji(client, guild, apiEmoji));
            }
        }

        for (const [id, emoji] of guild.emojis.cache) {
            if (data.emojis.find((emoji) => id === emoji.id)) {
                return;
            }

            deleted.push(emoji);
            guild.emojis.cache.delete(id);
        }

        client.emit('GuildEmojisUpdate', { created, updated, deleted });
    }
});