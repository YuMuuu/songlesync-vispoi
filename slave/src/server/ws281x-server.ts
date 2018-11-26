//ws281
const ws281x = require('ws281x-native');
const pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
