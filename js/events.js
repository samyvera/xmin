var event01 = {
    index:0,
    active:true,
    play:(game, keys) => {
        if (game.currentEvent.index === 0 && game.currentEvent.active) {
            game.mugshotId = 0;
            game.showMugshot = true;
            game.mugshotIsTalking = true;
            game.textBoxMessage = ["This game is lame.", "", ""];
            game.currentTextBoxMessage = ["", "", ""];
            game.currentEvent.active = false;
        }
        if (game.currentEvent.index === 1 && game.currentEvent.active) {
            game.mugshotId = 1;
            game.showMugshot = true;
            game.mugshotIsTalking = true;
            game.textBoxMessage = ["Samy made it.", "", ""];
            game.currentTextBoxMessage = ["", "", ""];
            game.currentEvent.active = false;
        }
        if (game.currentEvent.index === 2 && game.currentEvent.active) {
            game.mugshotId = 0;
            game.showMugshot = true;
            game.mugshotIsTalking = true;
            game.textBoxMessage = ["Figures.", "", ""];
            game.currentTextBoxMessage = ["", "", ""];
            game.currentEvent.active = false;
        }
        else if (game.currentEvent.index === 3) {
            game.mugshotId = null;
            game.showMugshot = false;
            game.mugshotIsTalking = false;
            game.textBoxMessage = ["", "", ""];
            game.currentTextBoxMessage = ["", "", ""];
            game.currentEvent.index = 0;
            game.currentEvent = null;
        }
        if (keys.get('select') && !game.lastKeys.get('select') && game.currentEvent) {
            game.currentEvent.index++;
            game.currentEvent.active = true;
        }
    }
}

var event02 = {
    index:0,
    active:true,
    play:(game, keys) => {
        if (game.currentEvent.index === 0 && game.currentEvent.active) {
            game.textBoxMessage = ["Enter shmup mode.", "", ""];
            game.currentTextBoxMessage = ["", "", ""];
            game.currentEvent.active = false;
        }
        else if (game.currentEvent.index === 1) {
            game.textBoxMessage = ["", "", ""];
            game.currentTextBoxMessage = ["", "", ""];
            game.currentEvent.index = 0;
            game.currentEvent = null;
            game.gameMode = 'shmup';
        }
        if (keys.get('select') && !game.lastKeys.get('select') && game.currentEvent) {
            game.currentEvent.index++;
            game.currentEvent.active = true;
        }
    }
}