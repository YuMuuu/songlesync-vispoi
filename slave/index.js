"use strict";
exports.__esModule = true;
var sa = require("songle-api");
var sw = require("songle-widget");
var fs = require("fs");
var settings = require("./settings");
var player = new sa.Player({
    accessToken: settings.tokens.access
});
var dir = "/sys/class/gpio";
var gpio2 = dir + "/gpio2";
var count = 0;
fs.writeFileSync(dir + '/export', 2); // 2ピン
fs.writeFileSync(gpio2 + '/direction', 'out'); // 出力に設定
var flash = function () {
    fs.writeFileSync(gpio2 + '/value', 0.1);
    setTimeout(flash, 500);
    fs.writeFileSync(dir + '/unexport', 2);
};
player.addPlugin(new sa.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
player.addPlugin(new sa.Plugin.SongleSync());
player.on("play", function (ev) { return console.log("play"); });
player.on("seek", function (ev) { return console.log("seek"); });
player.on("pause", function (ev) { return console.log("pause"); });
player.on("finish", function (ev) { return console.log("finish"); });
player.on("beatPlay", function (ev) {
    console.log("beat:", ev.data.beat.position);
    flash;
});
player.on("chordPlay", function (ev) {
    console.log("chordName:", ev.data.chord.name);
});
setInterval(function () { }, 10000);
