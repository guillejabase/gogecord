"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerTypes = exports.StickerFormatTypes = void 0;
var StickerFormatTypes;
(function (StickerFormatTypes) {
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    StickerFormatTypes[StickerFormatTypes["Lottie"] = 3] = "Lottie";
    StickerFormatTypes[StickerFormatTypes["GIF"] = 4] = "GIF";
})(StickerFormatTypes || (exports.StickerFormatTypes = StickerFormatTypes = {}));
var StickerTypes;
(function (StickerTypes) {
    StickerTypes[StickerTypes["Standard"] = 1] = "Standard";
    StickerTypes[StickerTypes["Guild"] = 2] = "Guild";
})(StickerTypes || (exports.StickerTypes = StickerTypes = {}));
class Sticker {
    client;
    available;
    description;
    formatType;
    id;
    name;
    type;
    constructor(client, data) {
        this.client = client;
        this.available = !!data.available;
        this.description = data.description || undefined;
        this.formatType = Object
            .keys(StickerFormatTypes)
            .find((key) => {
            return StickerFormatTypes[key] === data.format_type;
        });
        this.id = data.id;
        this.name = data.name;
        this.type = Object
            .keys(StickerTypes)
            .find((key) => {
            return StickerTypes[key] === data.type;
        });
        Object.defineProperty(this, 'client', { enumerable: false });
    }
}
exports.default = Sticker;
//# sourceMappingURL=Sticker.js.map