import { isRegExp } from "util";

const fs = require('fs')
const sa = require('songle-api')
const sw = require('songle-widget')
const settings = require('./settings')
const ws281x = require('ws281x-native')


const player = new sa.Player({
  accessToken: settings.tokens.access
})
const NUM_LEDS = parseInt(process.argv[2], 10) || 10,
  pixelData = new Uint32Array(NUM_LEDS)
ws281x.inti(NUM_LEDS)
process.on('SIGINT', function () {
  ws281x.reset()
  process.nextTick(function () { process.exit(0) })
})

player.addPlugin(new sa.Plugin.Beat)
player.addPlugin(new sw.Plugin.Chord)
player.addPlugin(new sa.Plugin.SongleSync)


player.on("play", (ev: any) => console.log("play"))
player.on("seek", (ev: any) => console.log("seek"))
player.on("pause", (ev: any) => console.log("pause"))
player.on("finish", (ev: any) => console.log("finish"))
player.on("beatPlay", (ev: any) => {
  console.log("beat:", ev.data.beat.position)
})
player.on("chordPlay", (ev: any) => {
  console.log("chordName:", ev.data.chord.name)
})


function beatflash(beat: number) {
  if (beat == 1) {
    flash(255, 0, 0)
  } else if (beat == 2) {
    flash(0, 255, 0)
  } else if (beat == 3) {
    flash(0, 0, 255)
  } else if (beat == 4) {
    flash(255, 255, 255)
  } else {
    console.log("error dayon")
  }
  flash(0, 0, 0)
}

function flash(r: number, g: number, b: number) {
  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = rgb2Int(r, g, b)
  }
  ws281x.remder(pixelData)
}


function rgb2Int(r: number, g: number, b: number) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff)
}






setInterval(() => { }, 10000)
