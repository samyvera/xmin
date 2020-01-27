class MugshotDisplay extends DisplayPart {
    constructor(pos, size, opacity) {
        super(pos, size, opacity);
        this.mouthIndex = 0;
        this.mugshots = document.createElement("img");
        this.mugshots.src = "img/mugshots.png";
        this.border = document.createElement("img");
        this.border.src = "img/mugshotBorder.png";
        this.bakcground = document.createElement("img");
        this.bakcground.src = "img/mugshotBackground.png";

        this.drawMugshot = (display) => {
            var id = display.game.mugshotId;

            display.cx.drawImage(this.mugshots,
                0, 96 * id, 96, 96,
                8 * display.zoom, 8 * display.zoom, 96 * display.zoom, 96 * display.zoom);

            if (display.frame % 256 > 232 && display.frame % 256 <= 240) {
                display.cx.drawImage(this.mugshots,
                    96, 96 * id + 8, 24, 8,
                    (41 + 8) * display.zoom, (47 + 8) * display.zoom, 24 * display.zoom, 8 * display.zoom);
            } else if (display.frame % 256 > 240 && display.frame % 256 < 256) {
                display.cx.drawImage(this.mugshots,
                    96, 96 * id + 16, 24, 8,
                    (41 + 8) * display.zoom, (47 + 8) * display.zoom, 24 * display.zoom, 8 * display.zoom);
            } else {
                display.cx.drawImage(this.mugshots,
                    96, 96 * id, 24, 8,
                    (41 + 8) * display.zoom, (47 + 8) * display.zoom, 24 * display.zoom, 8 * display.zoom);
            }

            if (display.game.mugshotIsTalking) {
                if (display.frame % 8 === 0) this.mouthIndex = Math.floor(Math.random() * 4);
                if (this.mouthIndex === 1) {
                    display.cx.drawImage(this.mugshots,
                        96, 96 * id + 36, 16, 12,
                        (43 + 8) * display.zoom, (60 + 8) * display.zoom, 16 * display.zoom, 12 * display.zoom);
                } else if (this.mouthIndex === 2) {
                    display.cx.drawImage(this.mugshots,
                        96, 96 * id + 48, 16, 12,
                        (43 + 8) * display.zoom, (60 + 8) * display.zoom, 16 * display.zoom, 12 * display.zoom);
                } else if (this.mouthIndex === 3) {
                    display.cx.drawImage(this.mugshots,
                        96, 96 * id + 60, 16, 12,
                        (43 + 8) * display.zoom, (60 + 8) * display.zoom, 16 * display.zoom, 12 * display.zoom);
                } else {
                    display.cx.drawImage(this.mugshots,
                        96, 96 * id + 24, 16, 12,
                        (43 + 8) * display.zoom, (60 + 8) * display.zoom, 16 * display.zoom, 12 * display.zoom);
                }
            } else {
                display.cx.drawImage(this.mugshots,
                    96, 96 * id + 24, 16, 12,
                    (43 + 8) * display.zoom, (60 + 8) * display.zoom, 16 * display.zoom, 12 * display.zoom);
            }
        }

        this.display = display => {
            display.cx.translate(this.pos.x * display.zoom, this.pos.y * display.zoom);

            display.cx.drawImage(this.bakcground,
                0, 0, this.size.x, this.size.y,
                0, 0, this.size.x * display.zoom, this.size.y * display.zoom);
            
            if (display.game.showMugshot) this.drawMugshot(display);            

            display.cx.drawImage(this.border,
                0, 0, this.size.x, this.size.y,
                0, 0, this.size.x * display.zoom, this.size.y * display.zoom);
            
            display.cx.translate(-this.pos.x * display.zoom, -this.pos.y * display.zoom);
        }
    }
}