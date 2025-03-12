"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Embed {
    author;
    color;
    description;
    fields = [];
    footer;
    image;
    timestamp;
    title;
    thumbnail;
    url;
    video;
    addFields(...fields) {
        this.fields.push(...fields);
        return this;
    }
    setAuthor(name, url) {
        this.author = { name, url };
        return this;
    }
    setColor(color) {
        if (typeof color == 'string') {
            if (color.startsWith('#')) {
                color = color.slice(1);
            }
            this.color = parseInt(color, 16);
        }
        else {
            this.color = color;
        }
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setFields(...fields) {
        this.fields = [];
        this.addFields(...fields);
        return this;
    }
    setFooter(text, icon) {
        this.footer = { icon, text };
        return this;
    }
    setImage(url) {
        this.image = { url };
        return this;
    }
    setTimestamp(timestamp) {
        this.timestamp = new Date(timestamp).toISOString();
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setVideo(url) {
        this.video = { url };
        return this;
    }
}
exports.default = Embed;
//# sourceMappingURL=Embed.js.map