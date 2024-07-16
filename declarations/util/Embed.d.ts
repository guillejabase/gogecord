export default class Embed {
    private color?;
    private description?;
    private title?;
    setColor(color: string | number): this;
    setDescription(description: string): this;
    setTitle(title: string): this;
}
