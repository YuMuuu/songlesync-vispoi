"use strict";
exports.__esModule = true;
var sa = require("songle-api");
var sw = require("songle-widget");
var settings = require("./settings");
var player = new sa.Player({
    accessToken: settings.tokens.access
});
var ws281x = require("rpi-ws281x-native");
var NUM_LEDS = parseInt(process.argv[2], 10) || 10, 
    pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);

process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
});

player.addPlugin(new sa.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
player.addPlugin(new sa.Plugin.SongleSync());
player.on("play", function (ev) { return console.log("play"); });
player.on("seek", function (ev) { return console.log("seek"); });
player.on("pause", function (ev) { return console.log("pause"); });
player.on("finish", function (ev) { return console.log("finish"); });
player.on("beatPlay", function (ev) {
    console.log("beat:", ev.data.beat.position);
    flash(ev.data.beat.position);    
});
player.on("chordPlay", function (ev) {
    console.log("chordName:", ev.data.chord.name);
});
setInterval(function () { }, 10000);

function flash(beat){
    var rgb = 0;
    if(beat == 1){
        rgb = rgb2Int(255, 0, 0);
    }else if(beat == 2){
        rgb = rgb2Int(0, 255, 0);
    }else if(beat == 3){
        rgb = rgb2Int(0, 0, 255);
    }else if(beat == 4){
        rgb = rgb2Int(255, 255, 255);
    }else{
	rgb = rgb2Int(0, 0, 0);
    } 
    writeLEDS(rgb);
    writeLEDS(rgb2Int(0, 0 ,0));
}

function writeLEDS(rgb){
    for(var i=0; i<NUM_LEDS; i++){
        pixelData[i] = rgb; 
    }
    ws281x.render(pixelData);
}

function rgb2Int ( r, g, b){
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);}
