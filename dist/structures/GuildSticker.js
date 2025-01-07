"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildStickerTypes = exports.GuildStickerFormatTypes = void 0;
var GuildStickerFormatTypes;
(function (GuildStickerFormatTypes) {
    GuildStickerFormatTypes[GuildStickerFormatTypes["PNG"] = 1] = "PNG";
    GuildStickerFormatTypes[GuildStickerFormatTypes["APNG"] = 2] = "APNG";
    GuildStickerFormatTypes[GuildStickerFormatTypes["Lottie"] = 3] = "Lottie";
    GuildStickerFormatTypes[GuildStickerFormatTypes["GIF"] = 4] = "GIF";
})(GuildStickerFormatTypes || (exports.GuildStickerFormatTypes = GuildStickerFormatTypes = {}));
var GuildStickerTypes;
(function (GuildStickerTypes) {
    GuildStickerTypes[GuildStickerTypes["Standard"] = 1] = "Standard";
    GuildStickerTypes[GuildStickerTypes["Guild"] = 2] = "Guild";
})(GuildStickerTypes || (exports.GuildStickerTypes = GuildStickerTypes = {}));
class GuildSticker {
    client;
    guild;
    available;
    description;
    formatType;
    id;
    name;
    tags;
    type;
    user;
    constructor(client, guild, data) {
        this.client = client;
        this.guild = guild;
        this.available = !!data.available;
        this.description = data.description || undefined;
        this.formatType = Object
            .keys(GuildStickerFormatTypes)
            .find((key) => {
            GuildStickerFormatTypes[key] === data.format_type;
        });
        this.id = data.id;
        this.name = data.name;
        this.tags = data.tags;
        this.type = Object
            .keys(GuildStickerTypes)
            .find((key) => {
            GuildStickerTypes[key] === data.type;
        });
        this.user = data.user ? client.users.cache.get(data.user.id) : undefined;
        guild.stickers.cache.set(this.id, this);
        client.guilds.cache.set(guild.id, guild);
        Object.defineProperties(this, {
            client: { enumerable: false },
            guild: { enumerable: false }
        });
    }
}
exports.default = GuildSticker;
//# sourceMappingURL=GuildSticker.js.map