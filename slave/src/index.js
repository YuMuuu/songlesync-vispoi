"use strict";
exports.__esModule = true;
// const fs = require('fs');
var sa = require('songle-api');
var sw = require('songle-widget');
var settings = require('./settings');
var ws281x = require('ws281x-native');
var player = new sa.Player({
    accessToken: settings.tokens.access
});
var NUM_LEDS = parseInt(process.argv[2], 10) || 10, pixelData = new Uint32Array(NUM_LEDS);
ws281x.inti(NUM_LEDS);
process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
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
    beatflash(ev.data.beat.position);
});
player.on("chordPlay", function (ev) {
    console.log("chordName:", ev.data.chord.name);
});
function beatflash(beat) {
    if (beat == 1) {
        flash(255, 0, 0);
    }
    else if (beat == 2) {
        flash(0, 255, 0);
    }
    else if (beat == 3) {
        flash(0, 0, 255);
    }
    else if (beat == 4) {
        flash(255, 255, 255);
    }
    else {
        console.log("error dayon");
    }
    flash(0, 0, 0);
}
function flash(r, g, b) {
    for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = rgb2Int(r, g, b);
    }
    ws281x.remder(pixelData);
}
function rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
setInterval(function () { }, 10000);
