import { isRegExp } from "util";

const sa = require("songle-api");
const sw = require("songle-widget");
const settings = require("./settings");
const ws281x = require("rpi-ws281x-native");

const player = new sa.Player({
  accessToken: settings.tokens.access,
});
const NUM_LEDS = parseInt(process.argv[2], 10) || 10;
const pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
process.on("SIGINT", () => {
  ws281x.reset();
  process.nextTick(() => process.exit(0));
});

let chorusSectionFlag: boolean = false;

player.addPlugin(new sa.Plugin.Beat);
player.addPlugin(new sw.Plugin.Chord);
player.addPlugin(new sa.Plugin.SongleSync);
player.addPlugin(new sa.Plugin.chordPlay);

player.on("play", (ev: any) => console.log("play"));
player.on("seek", (ev: any) => console.log("seek"));
player.on("pause", (ev: any) => {
  console.log("pause");
  flash(0, 0, 0);
});
player.on("finish", (ev: any) => {
  console.log("finish");
  flash(0, 0, 0);
});
player.on("beatPlay", (ev: any) => {
  console.log("beat:", ev.data.beat.position);
  beatflash(ev.data.beat.position);
});
player.on("chordPlay", (ev: any) => {
  console.log("chordName:", ev.data.chord.name);
});
player.on("chorusSectionEnter", (ev: any) => {
  console.log("chorusSection enter");
  chorusSectionFlag = true;
});
player.on("chorusSectionLeave", (ev: any) => {
  console.log("chorusSection leave");
  chorusSectionFlag = false;
});

function beatflash(beat: number) {
  let i = 180;
  if (chorusSectionFlag) { i = 255; } else { i = 180; }
  if (beat === 1) {
    flash(i, 0, 0);
  } else if (beat === 2) {
    flash(0, i, 0);
  } else if (beat === 3) {
    flash(0, 0, i);
  } else if (beat === 4) {
    flash(i, i, i);
  } else {
    console.log("error dayon");
  }
}

function flash(r: number, g: number, b: number) {
  for (let i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = rgb2Int(r, g, b);
  }
  ws281x.render(pixelData);
}

function rgb2Int(r: number, g: number, b: number) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

setInterval(() => { }, 10000);
