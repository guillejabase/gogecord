import type { APISticker } from 'discord-api-types/v10';
import Client from './Client';
export declare enum StickerFormatTypes {
    PNG = 1,
    APNG = 2,
    Lottie = 3,
    GIF = 4
}
export declare enum StickerTypes {
    Standard = 1,
    Guild = 2
}
export type StickerFormatType = keyof typeof StickerFormatTypes;
export type StickerType = keyof typeof StickerTypes;
export default class Sticker {
    client: Client;
    available: boolean;
    description?: string;
    formatType: StickerFormatType;
    id: string;
    name: string;
    type: StickerType;
    constructor(client: Client, data: APISticker);
}
//# sourceMappingURL=Sticker.d.ts.map