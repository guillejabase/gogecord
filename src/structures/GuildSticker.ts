import type { APISticker } from 'discord-api-types/v10';

import Client from './Client';
import Guild from './Guild';
import User from './User';

export enum GuildStickerFormatTypes {
    PNG = 1,
    APNG = 2,
    Lottie = 3,
    GIF = 4
}
export enum GuildStickerTypes {
    Standard = 1,
    Guild = 2
}

export type GuildStickerFormatType = keyof typeof GuildStickerFormatTypes;
export type GuildStickerType = keyof typeof GuildStickerTypes;

export default class GuildSticker {
    public available: boolean;
    public description?: string;
    public formatType: GuildStickerFormatType;
    public id: string;
    public name: string;
    public tags: string | string[];
    public type: GuildStickerType;
    public user?: User;

    constructor(public client: Client, public guild: Guild, data: APISticker) {
        this.available = !!data.available;
        this.description = data.description || undefined;
        this.formatType = Object
            .keys(GuildStickerFormatTypes)
            .find((key) => {
                GuildStickerFormatTypes[key as GuildStickerFormatType] as number === data.format_type;
            }) as GuildStickerFormatType;
        this.id = data.id;
        this.name = data.name;
        this.tags = data.tags;
        this.type = Object
            .keys(GuildStickerTypes)
            .find((key) => {
                GuildStickerTypes[key as GuildStickerType] as number === data.type;
            }) as GuildStickerType;

        this.user = data.user ? client.users.cache.get(data.user.id) : undefined;

        guild.stickers.cache.set(this.id, this);
        client.guilds.cache.set(guild.id, guild);

        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }
}