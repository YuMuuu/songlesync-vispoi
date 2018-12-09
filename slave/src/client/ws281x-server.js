var songleSync = require("src/client/songle-sync-api");
var util = require("src/util/util");
var ws281x = require('ws281x-native');
var NUM_LEDS = parseInt(process.argv[2], 10) || 10;
var pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
function flash(r, g, b) {
    pixelData.forEach(function (value) {
        value = util.rgb2Int(r, g, b);
    });
    ws281x.remder(pixelData);
}
var Main = /** @class */ (function () {
    function Main() {
    }
    return Main;
}());
var main = new Main();
