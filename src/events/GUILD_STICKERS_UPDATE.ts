import GatewayEvent from '../structures/GatewayEvent';
import GuildSticker from '../structures/GuildSticker';

export default new GatewayEvent({
    name: 'GUILD_STICKERS_UPDATE',

    run: (client, data) => {
        const guild = client.guilds.cache.get(data.guild_id)!;
        const created: GuildSticker[] = [];
        const updated: GuildSticker[] = [];
        const deleted: GuildSticker[] = [];

        for (const apiSticker of data.stickers) {
            const existing = guild.stickers.cache.get(apiSticker.id);

            if (existing) {
                updated.push(new GuildSticker(client, guild, apiSticker));
            } else {
                created.push(new GuildSticker(client, guild, apiSticker));
            }
        }

        for (const [id, sticker] of guild.stickers.cache) {
            if (data.stickers.find((sticker) => id === sticker.id)) {
                return;
            }

            deleted.push(sticker);
            guild.stickers.cache.delete(id);
        }

        client.emit('GuildStickersUpdate', { created, updated, deleted });
    }
});