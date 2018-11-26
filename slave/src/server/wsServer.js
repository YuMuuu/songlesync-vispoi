"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var sa = require('songle-api');
var sw = require('songle-widget');
var NUM_LEDS = parseInt(process.argv[2], 10) || 10;
//ws281
var ws281x = require('ws281x-native');
var pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
//ws
var port = 8888;
var wss = new ws_1.Server({ port: port });
console.log("listening port: ", port);
wss.on('connection', function (ws) {
    console.log('connection');
    ws.on('message', function (msg) {
        console.log('received: %s', msg);
        ws.send('Hello from ws');
    });
    ws.on('close', function () {
        console.log('close');
    });
});
//songelsync
var settings = require('./settings');
var player = new sa.Player({
    accessToken: settings.tokens.access
});
player.addPlugin(new sa.Plugin.Beat);
player.addPlugin(new sw.Plugin.Chord);
player.addPlugin(new sa.Plugin.SongleSync);
player.on("play", function (ev) { return console.log("play"); });
player.on("seek", function (ev) { return console.log("seek"); });
player.on("pause", function (ev) { return console.log("pause"); });
player.on("finish", function (ev) { return console.log("finish"); });
player.on("beatPlay", function (ev) {
    console.log("beat:", ev.data.beat.position);
    // beatflash(ev.data.beat.position);
});
player.on("chordPlay", function (ev) {
    console.log("chordName:", ev.data.chord.name);
});
//util
function rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
function flash(r, g, b) {
    pixelData.forEach(function (value) {
        value = rgb2Int(r, g, b);
    });
    ws281x.remder(pixelData);
}
// function beatflash(beat: number) {
//   if (beat == 1) {flash(255, 0, 0);
//   } else if (beat == 2) {flash(0, 255, 0);
//   } else if (beat == 3) {flash(0, 0, 255);
//   } else if (beat == 4) {flash(255, 255, 255);
//   } else {console.log("error dayon");
//   }
//   flash(0, 0, 0);
// }
