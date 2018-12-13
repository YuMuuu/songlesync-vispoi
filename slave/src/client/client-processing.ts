import * as  net from "net";
// tslint:disable-next-line:no-var-requires
const sa = require("songle-api");
// tslint:disable-next-line:no-var-requires
const sw = require("songle-widget");
// tslint:disable-next-line:no-var-requires
const settings = require("../../setting.js");

const port: number = 3000;
const host: any = "localhost";

const client = new net.Socket();
const player = new sa.Player({
  accessToken: settings.tokens.access,
});

const connect = () => client.connect(port, host, () => {
  console.log("Connected");
  client.write("Connection start");
});

player.addPlugin(new sw.Plugin.Beat());
player.addPlugin(new sw.Plugin.Chord());
player.addPlugin(new sw.Plugin.Melody());
player.addPlugin(new sw.Plugin.Chorus());
player.addPlugin(new sw.Plugin.SongleSync());

connect();

// 標準入力で入力したものを出力
process.stdin.resume();
process.stdin.on("data", (data: string) => {
  write(data);
});

player.on("play", () => console.log("play"));
player.on("seek", () => console.log("seek"));
player.on("pause", () => console.log("pause"));
player.on("beatEnter", (ev: any) => {
  write(ev.data.beat.position);
});
player.on("chordEnter", (ev: any) => {
  write(ev.data.chord.name);
});

client.on("data", (data: net.Socket) => {
  console.log("Received: " + data);
  // client.destroy();
});

client.on("erorr", (err: net.Socket) => {
  console.log(err);
});

client.on("close", () => {
  console.log("Connection closed");
  process.exit();
});

const write = (data: string) => {
  client.write(data.toString);
};
