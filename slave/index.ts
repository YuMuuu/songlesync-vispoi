import sa = require("songle-api");
import sw = require("songle-widget");
import fs = require('fs');
import settings = require("./settings");


const player = new sa.Player({
    accessToken: settings.tokens.access
});

const dir: String = "/sys/class/gpio";
const gpio2: String = dir + "/gpio2";


let count = 0;


fs.writeFileSync(dir + '/export', 2); // 2ピン
fs.writeFileSync(gpio2 + '/direction', 'out'); // 出力に設定


let flash = (): void  => {
    fs.writeFileSync(gpio2 + '/value', 0.1);
    setTimeout(flash, 500);
    fs.writeFileSync(dir + '/unexport', 2); 
};

player.addPlugin(new sa.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
player.addPlugin(new sa.Plugin.SongleSync());


player.on("play", (ev) => console.log("play"));
player.on("seek", (ev) => console.log("seek"));
player.on("pause", (ev) => console.log("pause"));
player.on("finish", (ev) => console.log("finish"));
player.on("beatPlay", (ev) => {
    console.log("beat:", ev.data.beat.position)
    flash
});
player.on("chordPlay", (ev) => {
    console.log("chordName:", ev.data.chord.name)
});


setInterval(() => { }, 10000);
