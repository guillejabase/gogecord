import type { APISticker } from 'discord-api-types/v10';
import Client from './Client';
import Guild from './Guild';
import User from './User';
export declare enum GuildStickerFormatTypes {
    PNG = 1,
    APNG = 2,
    Lottie = 3,
    GIF = 4
}
export declare enum GuildStickerTypes {
    Standard = 1,
    Guild = 2
}
export type GuildStickerFormatType = keyof typeof GuildStickerFormatTypes;
export type GuildStickerType = keyof typeof GuildStickerTypes;
export default class GuildSticker {
    client: Client;
    guild: Guild;
    available: boolean;
    description?: string;
    formatType: GuildStickerFormatType;
    id: string;
    name: string;
    tags: string | string[];
    type: GuildStickerType;
    user?: User;
    constructor(client: Client, guild: Guild, data: APISticker);
}
//# sourceMappingURL=GuildSticker.d.ts.map