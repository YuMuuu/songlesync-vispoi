"use strict";
exports.__esModule = true;
// tslint:disable-next-line:no-var-requires
var sa = require("songle-api");
// tslint:disable-next-line:no-var-requires
var settings = require("./settings");
// tslint:disable-next-line:no-var-requires
var ws281x = require("rpi-ws281x-native");
var player = new sa.Player({
    accessToken: settings.tokens.access
});
var NUM_LEDS = parseInt(process.argv[2], 10) || 10;
var pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
process.on("SIGINT", function () {
    ws281x.reset();
    process.nextTick(function () { return process.exit(0); });
});
var chorusSectionFlag = false;
var chordName = "C";
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.Beat);
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.Chord);
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.SongleSync);
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.chordPlay);
player.on("play", function (ev) { return console.log("play"); });
player.on("seek", function (ev) { return console.log("seek"); });
player.on("pause", function (ev) {
    console.log("pause");
    flash(0, 0, 0);
});
player.on("finish", function (ev) {
    console.log("finish");
    flash(0, 0, 0);
});
player.on("beatPlay", function (ev) {
    console.log("beat:", ev.data.beat.position);
    beatflash(ev.data.beat.position);
});
player.on("chordPlay", function (ev) {
    console.log("chordName:", ev.data.chord.name);
    var name = ev.data.chrod.name.match(/^[A-G|N]?[#|b]?(m|sus|add|dim|aug||)/u);
    chordName = name[0];
    console.log("easy chordName:", chordName);
});
player.on("chorusSectionEnter", function (ev) {
    console.log("chorusSection enter");
    chorusSectionFlag = true;
});
player.on("chorusSectionLeave", function (ev) {
    console.log("chorusSection leave");
    chorusSectionFlag = false;
});
function beatflash(beat) {
    var i = 180;
    if (chorusSectionFlag) {
        i = 255;
    }
    else {
        i = 180;
    }
    if (beat === 1) {
        flash(i, 0, 0);
    }
    else if (beat === 2) {
        flash(0, i, 0);
    }
    else if (beat === 3) {
        flash(0, 0, i);
    }
    else if (beat === 4) {
        flash(i, i, i);
    }
    else {
        console.log("error dayon");
    }
}
function flash(r, g, b) {
    for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = rgb2Int(r, g, b);
    }
    ws281x.render(pixelData);
}
function rgb2Int(r, g, b) {
    // tslint:disable-next-line:no-bitwise
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
// tslint:disable-next-line:no-empty
setInterval(function () { }, 10000);
