class MapDisplay extends DisplayPart {
    constructor(pos, size, opacity) {
        super(pos, size, opacity);

        this.map = document.createElement("img");
        this.map.src = "img/map.png";
        this.btn = document.createElement("img");
        this.btn.src = "img/btn.png";

        this.display = display => {
            display.cx.translate(this.pos.x * display.zoom, this.pos.y * display.zoom);

            display.cx.drawImage(this.map,
                0, 0, this.size.x, this.size.y,
                0, 0, this.size.x * display.zoom, this.size.y * display.zoom);

                
            display.cx.drawImage(this.btn,
                6, display.game.keys.get('select') ? 6 : 0, 20, 6,
                80 * display.zoom, 24 * display.zoom, 20 * display.zoom, 6 * display.zoom);
            display.cx.drawImage(this.btn,
                0, display.game.keys.get('up') ? 6 : 0, 6, 6,
                87 * display.zoom, 10 * display.zoom, 6 * display.zoom, 6 * display.zoom);
            display.cx.drawImage(this.btn,
                0, display.game.keys.get('right') ? 6 : 0, 6, 6,
                94 * display.zoom, 17 * display.zoom, 6 * display.zoom, 6 * display.zoom);
            display.cx.drawImage(this.btn,
                0, display.game.keys.get('down') ? 6 : 0, 6, 6,
                87 * display.zoom, 17 * display.zoom, 6 * display.zoom, 6 * display.zoom);
            display.cx.drawImage(this.btn,
                0, display.game.keys.get('left') ? 6 : 0, 6, 6,
                80 * display.zoom, 17 * display.zoom, 6 * display.zoom, 6 * display.zoom);

            display.cx.translate(-this.pos.x * display.zoom, -this.pos.y * display.zoom);
        }
    }
}