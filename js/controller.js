var keyCodes = new Map([
    [37, "left"],
    [38, "up"],
    [39, "right"],
    [40, "down"],
    [32, "select"]
]);

var trackKeys = codes => {
    var pressed = new Map();
    codes.forEach(code => pressed.set(code, false));
    var handler = event => {
        if (codes.get(event.keyCode) !== undefined) {
            var down = event.type === "keydown";
            pressed.set(codes.get(event.keyCode), down);
            event.preventDefault();
        }
    };
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
};