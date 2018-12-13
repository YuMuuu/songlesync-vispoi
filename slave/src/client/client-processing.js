"use strict";
exports.__esModule = true;
var net = require("net");
// tslint:disable-next-line:no-var-requires
var sa = require("songle-api");
// tslint:disable-next-line:no-var-requires
var sw = require("songle-widget");
// tslint:disable-next-line:no-var-requires
var settings = require("../../setting.js");
var port = 3000;
var host = "localhost";
var client = new net.Socket();
var player = new sa.Player({
    accessToken: settings.tokens.access
});
var connect = function () { return client.connect(port, host, function () {
    console.log("Connected");
    client.write("Connection start");
}); };
player.addPlugin(new sw.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
player.addPlugin(new sw.Plugin.Melody());
player.addPlugin(new sw.Plugin.Chorus());
player.addPlugin(new sw.Plugin.SongleSync());
connect();
// 標準入力で入力したものを出力
process.stdin.resume();
process.stdin.on("data", function (data) {
    write(data);
});
player.on("play", function () { return console.log("play"); });
player.on("seek", function () { return console.log("seek"); });
player.on("pause", function () { return console.log("pause"); });
player.on("beatEnter", function (ev) {
    write(ev.data.beat.position);
});
player.on("chordEnter", function (ev) {
    write(ev.data.chord.name);
});
client.on("data", function (data) {
    console.log("Received: " + data);
    // client.destroy();
});
client.on("erorr", function (err) {
    console.log(err);
});
client.on("close", function () {
    console.log("Connection closed");
    process.exit();
});
var write = function (data) {
    client.write(data.toString);
};
