export default class Embed {
    private author?: {
        name: string;
        url: string;
    };
    private color?: number;
    private description?: string;
    private fields: {
        inline?: boolean;
        name: string;
        value: string;
    }[] = [];
    private footer?: {
        icon?: string;
        text: string;
    };
    private image?: {
        url: string;
    };
    private timestamp?: string;
    private title?: string;
    private thumbnail?: {
        url: string;
    };
    private url?: string;
    private video?: {
        url: string;
    };

    public addFields(...fields: Embed['fields']): this {
        this.fields.push(...fields);

        return this;
    }
    public setAuthor(name: string, url: string): this {
        this.author = { name, url };

        return this;
    }
    public setColor(color: string | number): this {
        if (typeof color == 'string') {
            if (color.startsWith('#')) {
                color = color.slice(1);
            }

            this.color = parseInt(color, 16);
        } else {
            this.color = color;
        }

        return this;
    }
    public setDescription(description: string): this {
        this.description = description;

        return this;
    }
    public setFields(...fields: Embed['fields']): this {
        this.fields = [];
        this.addFields(...fields);

        return this;
    }
    public setFooter(text: string, icon?: string): this {
        this.footer = { icon, text };

        return this;
    }
    public setImage(url: string): this {
        this.image = { url };

        return this;
    }
    public setTimestamp(timestamp: number | string | Date): this {
        this.timestamp = new Date(timestamp).toISOString();

        return this;
    }
    public setTitle(title: string): this {
        this.title = title;

        return this;
    }
    public setThumbnail(url: string): this {
        this.thumbnail = { url };

        return this;
    }
    public setURL(url: string): this {
        this.url = url;

        return this;
    }
    public setVideo(url: string): this {
        this.video = { url };

        return this;
    }
}