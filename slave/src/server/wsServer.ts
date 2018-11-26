const sa = require('songle-api');
const sw = require('songle-widget');
const NUM_LEDS = parseInt(process.argv[2], 10) || 10;
const settings = require('./settings');
const player = new sa.Player({
  accessToken: settings.tokens.access
});
player.addPlugin(new sa.Plugin.Beat);
player.addPlugin(new sw.Plugin.Chord);
player.addPlugin(new sa.Plugin.SongleSync);


enum ActionTypes{
  PLAY,
  SEEK,
  PAUSE,
  FINISH,
  BEATPLAY,
  CHROEDPLAY,
}

// interface PlayerElementEvent<T extends PlayerElement> extends Event {
//   target: T;
// }

class Player {
  constructor() { }
  on(Action: ActionTypes, callback: (ev: String) => any){
    callback();
  }
}

const foo = new Player;
foo.on(ActionTypes.PLAY, () => console.log('play'));
foo.on(ActionTypes.SEEK, () => console.log('seek'));
foo.on(ActionTypes.PAUSE, () => console.log('pause'));
foo.on(ActionTypes.FINISH, () => console.log('finish'));
foo.on(ActionTypes.BEATPLAY, () => console.log('beatplay'));
foo.on(ActionTypes.CHROEDPLAY, () => console.log('chrodeplay'));


//util
function rgb2Int(r: number, g: number, b: number) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function flash(r: number, g: number, b: number) {
  pixelData.forEach(value => {
    value = rgb2Int(r, g, b);
  });
  ws281x.remder(pixelData);
}
