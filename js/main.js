window.onload = () => {

    var game = new Game();
    var display = new Display(game);
    var controller = trackKeys(keyCodes);

    var frame = () => {
        game.update(controller);
        display.drawFrame(game);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}