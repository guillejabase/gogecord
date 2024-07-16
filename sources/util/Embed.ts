export default class Embed {
    private color?: number;
    private description?: string;
    private title?: string;

    setColor(color: string | number) {
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

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }
}