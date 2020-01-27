class GameDisplay extends DisplayPart {
    constructor(pos, size, opacity) {
        super(pos, size, opacity);

        this.border = document.createElement("img");
        this.border.src = "img/gameBorder.png";

        this.player = document.createElement("img");
        this.player.src = "img/player.png";

        this.actor = document.createElement("img");
        this.actor.src = "img/actor.png";

        this.talk = document.createElement("img");
        this.talk.src = "img/talk.png";

        this.background1 = document.createElement("img");
        this.background1.src = "img/background1.png";
        this.background2 = document.createElement("img");
        this.background2.src = "img/background2.png";
        this.background3 = document.createElement("img");
        this.background3.src = "img/background3.png";

        this.drawBackground = display => {

            for (let i = 0; i < 144; i++) {
                display.cx.drawImage(this.background1,
                    0, i, 384 - 1, 1,
                    Math.sin(i + display.frame / 16) * display.zoom, i * display.zoom, (384 - 1) * display.zoom, 1 * display.zoom);
            }
            display.cx.drawImage(this.background2,
                0, 0, 384, 144,
                0 * display.zoom, 0 * display.zoom, 384 * display.zoom, 144 * display.zoom);
            display.cx.drawImage(this.background3,
                0, 0, 384, 144,
                0 * display.zoom, 0 * display.zoom, 384 * display.zoom, 144 * display.zoom);
        }

        this.drawPlayer = display => {
            var xPos = 0;
            var yPos = 0;

            if (display.game.unit.isWalking) yPos = 1;
            else yPos = 0;

            var frameMax = 0;
            if (display.game.unit.isWalking) frameMax = 8;
            else frameMax = 4;

            var frameSpeed = display.frame / 8;

            display.cx.save();
            if (display.game.unit.dir !== 1) flipHorizontally(display.cx, display.game.unit.pos.x * display.zoom);
            display.cx.drawImage(this.player,
                xPos + (Math.floor(frameSpeed) % frameMax) * 32, yPos * 48, 32, 48,
                (display.game.unit.pos.x - 16) * display.zoom, (display.game.unit.pos.y - 24) * display.zoom, 32 * display.zoom, 48 * display.zoom);
            display.cx.restore();
        }

        this.drawActors = display => {
            display.game.actors.forEach(actor => {
                var xPos = 0;
                var yPos = 0;

                display.cx.save();
                if (actor.dir !== 1) flipHorizontally(display.cx, actor.pos.x * display.zoom);
                display.cx.drawImage(this.actor,
                    xPos * 32, yPos * 48, 32, 48,
                    (actor.pos.x - 16) * display.zoom, (actor.pos.y - 24) * display.zoom, 32 * display.zoom, 48 * display.zoom);
                display.cx.restore();

                if (!display.game.currentEvent && actor.canTriggerEvent) {
                    display.cx.drawImage(this.talk,
                        (Math.floor(display.frame / 16) % 4) * 16, 0, 16, 16,
                        (actor.pos.x - 16) * display.zoom, (actor.pos.y - 40) * display.zoom, 16 * display.zoom, 16 * display.zoom);
                }
            });
        }

        this.display = display => {
            display.cx.translate(this.pos.x * display.zoom, this.pos.y * display.zoom);

            this.drawBackground(display);
            this.drawActors(display);
            this.drawPlayer(display);

            display.cx.drawImage(this.border,
                0, 0, this.size.x, this.size.y,
                0, 0, this.size.x * display.zoom, this.size.y * display.zoom);

            display.cx.translate(-this.pos.x * display.zoom, -this.pos.y * display.zoom);
        }
    }
}