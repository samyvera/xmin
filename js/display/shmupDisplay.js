class ShmupDisplay extends DisplayPart {
    constructor(pos, size, opacity) {
        super(pos, size, opacity);

        this.border = document.createElement("img");
        this.border.src = "img/shmupBorder.png";

        this.display = display => {
            display.cx.translate(this.pos.x * display.zoom, this.pos.y * display.zoom);

            display.cx.fillStyle = "#fff";
            var xPos = this.size.x / 2 - 10;
            var yPos = (display.frame * display.game.scrollSpeed % (this.size.y + 20)) - 20;
            display.cx.fillRect(xPos * display.zoom, yPos * display.zoom, 20 * display.zoom, 20 * display.zoom);

            display.cx.drawImage(this.border,
                0, 0, this.size.x, this.size.y,
                0, 0, this.size.x * display.zoom, this.size.y * display.zoom);

            display.cx.translate(-this.pos.x * display.zoom, -this.pos.y * display.zoom);
        }
    }
}