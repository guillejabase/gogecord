export default class Embed {
    private author?;
    private color?;
    private description?;
    private fields;
    private footer?;
    private image?;
    private timestamp?;
    private title?;
    private thumbnail?;
    private url?;
    private video?;
    addFields(...fields: Embed['fields']): this;
    setAuthor(name: string, url: string): this;
    setColor(color: string | number): this;
    setDescription(description: string): this;
    setFields(...fields: Embed['fields']): this;
    setFooter(text: string, icon?: string): this;
    setImage(url: string): this;
    setTimestamp(timestamp: number | string | Date): this;
    setTitle(title: string): this;
    setThumbnail(url: string): this;
    setURL(url: string): this;
    setVideo(url: string): this;
}
//# sourceMappingURL=Embed.d.ts.map