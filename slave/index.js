"use strict";
exports.__esModule = true;
var sa = require("songle-api");
var sw = require("songle-widget");
var settings = require("./settings");
var player = new sa.Player({
    accessToken: settings.tokens.access
});
player.addPlugin(new sa.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
//player.addPlugin(new sw.Plugin.Melody());
//player.addPlugin(new sw.Plugin.Chorus());
player.addPlugin(new sa.Plugin.SongleSync());
player.on("play", function (ev) { return console.log("play"); });
player.on("seek", function (ev) { return console.log("seek"); });
player.on("pause", function (ev) { return console.log("pause"); });
player.on("finish", function (ev) { return console.log("finish"); });
player.on("beatPlay", function (ev) {
    console.log("beat:", ev.data.beat.position);
    //console.log(ev)
});
player.on("chordPlay", function (ev) {
    //console.log("chordPlay")
    // console.log("duration:", ev.data.chord.duration)
    console.log("chordName:", ev.data.chord.name);
    //console.log(ev)
});
// player.on("chorusEnter", (ev) => console.log("chorusEnter"));
// player.on("chorusLeave", (ev) => console.log("chorusLeave"));
// player.on("repeatEnter", (ev) => console.log("repeatEnter"));
// player.on("repeatLeave", (ev) => console.log("repeatLeave"));
setInterval(function () { }, 10000);
