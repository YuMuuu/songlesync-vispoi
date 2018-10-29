import sa = require("songle-api");　
import sw = require("songle-widget"); 
import fs = require('fs'); 
import settings = require("./settings");


const player = new sa.Player({
    accessToken: settings.tokens.access
});


player.addPlugin(new sa.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
//player.addPlugin(new sw.Plugin.Melody());
//player.addPlugin(new sw.Plugin.Chorus());
player.addPlugin(new sa.Plugin.SongleSync());


player.on("play",        (ev) => console.log("play"));
player.on("seek",        (ev) => console.log("seek"));
player.on("pause",       (ev) => console.log("pause"));
player.on("finish",      (ev) => console.log("finish"));
player.on("beatPlay",    (ev) => {
    console.log("beat:", ev.data.beat.position)
    //console.log(ev)
});
player.on("chordPlay",   (ev) => {
    //console.log("chordPlay")
    // console.log("duration:", ev.data.chord.duration)
    console.log("chordName:", ev.data.chord.name)
    //console.log(ev)
});
// player.on("chorusEnter", (ev) => console.log("chorusEnter"));
// player.on("chorusLeave", (ev) => console.log("chorusLeave"));
// player.on("repeatEnter", (ev) => console.log("repeatEnter"));
// player.on("repeatLeave", (ev) => console.log("repeatLeave"));


setInterval(() => { }, 10000);
