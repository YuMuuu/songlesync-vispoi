const songleSync = require("src/client/songle-sync-api");
const util = require("src/util/util")
const ws281x = require('ws281x-native');
const NUM_LEDS = parseInt(process.argv[2], 10) || 10;
const pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

function flash(r: number, g: number, b: number): void {
  pixelData.forEach(value => {
    value = util.rgb2Int(r, g, b);
  });
  ws281x.remder(pixelData);
}

class Main {

}

const main = new Main();
