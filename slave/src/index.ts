import { isRegExp } from "util";

// tslint:disable-next-line:no-var-requires
const sa = require("songle-api");
// tslint:disable-next-line:no-var-requires
const settings = require("./settings");
// tslint:disable-next-line:no-var-requires
const ws281x = require("rpi-ws281x-native");

const player = new sa.Player({
  accessToken: settings.tokens.access,
});

const NUM_LEDS: number = parseInt(process.argv[2], 10) || 10;
const pixelData: Uint32Array = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
process.on("SIGINT", () => {
  ws281x.reset();
  process.nextTick(() => process.exit(0));
});

let chorusSectionFlag: boolean = false;
let chordName: string = "C";

// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.Beat);
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.Chord);
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.SongleSync);
// tslint:disable-next-line:new-parens
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
  const name: string[] = ev.data.chrod.name.match(/^[A-G|N]?[#|b]?(m|sus|add|dim|aug||)/u);
  chordName = name[0];
  console.log("easy chordName:", chordName);
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

function rgb2Int(r: number, g: number, b: number): number {
  // tslint:disable-next-line:no-bitwise
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

// tslint:disable-next-line:no-empty
setInterval(() => { }, 10000);
