import type { APISticker } from 'discord-api-types/v10';

import Client from './Client';

export enum StickerFormatTypes {
    PNG = 1,
    APNG = 2,
    Lottie = 3,
    GIF = 4
}
export enum StickerTypes {
    Standard = 1,
    Guild = 2
}

export type StickerFormatType = keyof typeof StickerFormatTypes;
export type StickerType = keyof typeof StickerTypes;

export default class Sticker {
    public available: boolean;
    public description?: string;
    public formatType: StickerFormatType;
    public id: string;
    public name: string;
    public type: StickerType;

    public constructor(public client: Client, data: APISticker) {
        this.available = !!data.available;
        this.description = data.description || undefined;
        this.formatType = Object
            .keys(StickerFormatTypes)
            .find((key) => {
                return StickerFormatTypes[key as StickerFormatType] as number === data.format_type;
            }) as StickerFormatType;
        this.id = data.id;
        this.name = data.name;
        this.type = Object
            .keys(StickerTypes)
            .find((key) => {
                return StickerTypes[key as StickerType] as number === data.type;
            }) as StickerType;

        Object.defineProperty(this, 'client', { enumerable: false });
    }
}