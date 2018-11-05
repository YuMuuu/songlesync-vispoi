import sa = require("songle-api");
import sw = require("songle-widget");
import fs = require('fs');
import settings = require("./settings");

import ws281x = require("../lib/ws281x-native");

const player = new sa.Player({
    accessToken: settings.tokens.access
});


player.addPlugin(new sa.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
player.addPlugin(new sa.Plugin.SongleSync());


player.on("play", (ev) => console.log("play"));
player.on("seek", (ev) => console.log("seek"));
player.on("pause", (ev) => console.log("pause"));
player.on("finish", (ev) => console.log("finish"));
player.on("beatPlay", (ev) => {
    console.log("beat:", ev.data.beat.position)
});
player.on("chordPlay", (ev) => {
    console.log("chordName:", ev.data.chord.name)
});


setInterval(() => { }, 10000);
