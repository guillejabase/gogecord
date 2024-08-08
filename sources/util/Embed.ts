export default class Embed {
    private color?: number;
    private description?: string;
    private title?: string;

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
    public setTitle(title: string): this {
        this.title = title;
        return this;
    }
}