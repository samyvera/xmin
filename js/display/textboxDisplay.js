class TextboxDisplay extends DisplayPart {
    constructor(pos, size, opacity) {
        super(pos, size, opacity);

        this.border = document.createElement("img");
        this.border.src = "img/textboxBorder.png";

        this.display = display => {
            display.cx.translate(this.pos.x * display.zoom, this.pos.y * display.zoom);

            display.cx.fillStyle = "#000";
            display.cx.fillRect(0, 8 * display.zoom, this.size.x * display.zoom, (this.size.y - 16) * display.zoom);

            display.cx.fillStyle = "#fff";
            display.cx.font = 16 * display.zoom + "px font";
            display.cx.fillText(display.game.currentTextBoxMessage[0], 16 * display.zoom, 32 * display.zoom);
            display.cx.fillText(display.game.currentTextBoxMessage[1], 16 * display.zoom, 48 * display.zoom);
            display.cx.fillText(display.game.currentTextBoxMessage[2], 16 * display.zoom, 64 * display.zoom);

            display.cx.drawImage(this.border,
                0, 0, this.size.x, this.size.y,
                0, 0, this.size.x * display.zoom, this.size.y * display.zoom);
            
            display.cx.translate(-this.pos.x * display.zoom, -this.pos.y * display.zoom);
        }
    }
}