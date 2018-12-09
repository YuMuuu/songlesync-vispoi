const sa = require('songle-api');
const sw = require('songle-widget');
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

class Player {
  constructor() { }
  on(Action: ActionTypes, callback: (ev: any) => any){
    (ev:any) => callback(ev);
  }
}

// const foo = new Player;
// foo.on(ActionTypes.PLAY, () => console.log('play'));
// foo.on(ActionTypes.SEEK, () => console.log('seek'));
// foo.on(ActionTypes.PAUSE, () => console.log('pause'));
// foo.on(ActionTypes.FINISH, () => console.log('finish'));
// foo.on(ActionTypes.BEATPLAY, (ev:any) => {
//   console.log('beatplay');
//   // tslint:disable-next-line:no-unused-expression
//   ev.data.beat.position;
// });
// foo.on(ActionTypes.CHROEDPLAY, (ev:any) => {
//   console.log('chrodeplay');
//   ev.data.chord.name;
// });
