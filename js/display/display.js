class Display {
    constructor() {
        this.game = null;
        this.frame = 0;
        this.zoom = 1;

        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d");

        this.displayParts = [
            new GameDisplay(new Vector2D(0, 0), new Vector2D(384, 144), 0),
            new MapDisplay(new Vector2D(384, 0), new Vector2D(128, 144), 0),
            new MugshotDisplay(new Vector2D(0, 144), new Vector2D(112, 112), 0),
            new TextboxDisplay(new Vector2D(112, 144), new Vector2D(400, 88), 0),
        ];

        this.updateDisplayParts = gameMode => {
            if (gameMode === 'explore') {
                if (!this.displayParts.some(part => part instanceof GameDisplay)) this.displayParts.push(new GameDisplay(new Vector2D(0, 0), new Vector2D(384, 144), 0));
                if (!this.displayParts.some(part => part instanceof TextboxDisplay)) this.displayParts.push(new TextboxDisplay(new Vector2D(112, 144), new Vector2D(400, 88), 0));
                
                this.displayParts = this.displayParts.filter(part => !(part instanceof ShmupDisplay));
            }
            else if (gameMode === 'shmup') {
                if (!this.displayParts.some(part => part instanceof ShmupDisplay)) this.displayParts.push(new ShmupDisplay(new Vector2D(112, 0), new Vector2D(272, 256), 0));
                
                this.displayParts = this.displayParts.filter(part => !(part instanceof GameDisplay || part instanceof TextboxDisplay));
            }
        }

        this.drawFrame = game => {
            this.game = game;
            this.updateDisplayParts(game.gameMode);

            this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.displayParts.forEach(part => {
                part.opacity += part.opacity !== 1 && this.frame % 8 === 0 ? 0.25 : 0;
                this.cx.globalAlpha = part.opacity;
                part.display(this);
                this.cx.globalAlpha = 1;
            });

            this.frame++;
        }

        this.resize = () => {
            if (innerWidth >= 2048 && innerHeight >= 1024) {
                this.zoom = 4;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 2048;
                this.canvas.height = 1024;
            } else if (innerWidth >= 1536 && innerHeight >= 768) {
                this.zoom = 3;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 1536;
                this.canvas.height = 768;
            } else if (innerWidth >= 1024 && innerHeight >= 512) {
                this.zoom = 2;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 1024;
                this.canvas.height = 512;
            } else {
                this.zoom = 1;
                this.cx.scale(this.zoom, this.zoom);
                this.canvas.width = 512;
                this.canvas.height = 256;
            }
            this.cx.imageSmoothingEnabled = false;
        }

        this.resize();
        window.addEventListener('resize', this.resize);
        document.body.appendChild(this.canvas);
    }
}