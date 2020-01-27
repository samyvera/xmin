class Game {
    constructor() {
        this.frame = 0;

        this.unit = {
            isWalking: false,
            pos: {
                x: 64,
                y: 112
            },
            dir: 1,
        }

        this.actors = [{
                pos: {
                    x: 256,
                    y: 112
                },
                dir: null,
                looksAtPlayer: true,
                canTriggerEvent: false,
                event: event01
            },
            {
                pos: {
                    x: 128,
                    y: 112
                },
                dir: -1,
                looksAtPlayer: false,
                canTriggerEvent: false,
                event: event02
            }
        ];

        this.currentEvent = null;

        this.showMugshot = false;
        this.mugshotId = null;
        this.mugshotIsTalking = false;
        this.currentTextBoxMessage = ["", "", ""];
        this.textBoxMessage = ["", "", ""];

        this.keys = null;
        this.lastKeys = null;

        this.gameMode = 'explore';

        this.updateExplore = () => {
            if (!this.currentEvent) {
                if (this.keys.get('left') !== this.keys.get('right')) {
                    this.unit.isWalking = true;
                    this.unit.dir = this.keys.get('right') ? 1 : -1;
                    if (this.unit.pos.x + this.unit.dir > 16 && this.unit.pos.x + this.unit.dir <= 368) this.unit.pos.x += this.unit.dir;
                } else this.unit.isWalking = false;

                this.actors.forEach(actor => {
                    if (actor.looksAtPlayer) actor.dir = actor.pos.x >= this.unit.pos.x ? actor.dir = -1 : 1;
                    actor.canTriggerEvent = Math.abs(this.unit.pos.x - actor.pos.x) <= 48 && Math.abs(this.unit.pos.x - actor.pos.x) > 16 && actor.dir !== this.unit.dir &&
                        (actor.pos.x < this.unit.pos.x && actor.dir === 1 || actor.pos.x > this.unit.pos.x && actor.dir === -1) ? true : false;

                    if (this.keys.get('select') && !this.lastKeys.get('select') && actor.canTriggerEvent && !this.currentEvent) {
                        this.unit.isWalking = false;

                        this.currentEvent = actor.event;
                    }
                });
            } else this.currentEvent.play(this, this.keys);
        }

        this.updateShmup = () => {
            this.scrollSpeed = 5;
        }

        this.update = keys => {
            this.keys = keys;
            
            if (this.gameMode === 'explore') {
                this.updateExplore();
            }
            else if (this.gameMode === 'shmup') {
                this.updateShmup();
            }

            if (this.frame % 2 === 0) {
                if (this.currentTextBoxMessage[0] !== this.textBoxMessage[0]) this.currentTextBoxMessage[0] += this.textBoxMessage[0][this.currentTextBoxMessage[0].length];
                else if (this.currentTextBoxMessage[1] !== this.textBoxMessage[1]) this.currentTextBoxMessage[1] += this.textBoxMessage[1][this.currentTextBoxMessage[1].length];
                else if (this.currentTextBoxMessage[2] !== this.textBoxMessage[2]) this.currentTextBoxMessage[2] += this.textBoxMessage[2][this.currentTextBoxMessage[2].length];
                else this.mugshotIsTalking = false;
            }

            this.lastKeys = new Map([
                ["left", keys.get('left')],
                ["up", keys.get('up')],
                ["right", keys.get('right')],
                ["down", keys.get('down')],
                ["select", keys.get('select')]
            ]);
            this.frame++;
        }
    }
}