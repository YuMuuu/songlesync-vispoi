// tslint:disable-next-line:no-var-requires
const sa = require("songle-api");
// tslint:disable-next-line:no-var-requires
const sw = require("songle-widget");
// tslint:disable-next-line:no-var-requires
const settings = require("./settings");
const player = new sa.Player({
  accessToken: settings.tokens.access,
});

enum ActionTypes {
  PLAY,
  SEEK,
  PAUSE,
  FINISH,
  BEATPLAY,
  CHROEDPLAY,
}

class Player {
  constructor() {
    // tslint:disable-next-line:new-parens
    player.addPlugin(new sa.Plugin.Beat);
    // tslint:disable-next-line:new-parens
    player.addPlugin(new sw.Plugin.Chord);
    // tslint:disable-next-line:new-parens
    player.addPlugin(new sa.Plugin.SongleSync);
  }
  public on(Action: ActionTypes, callback: (ev: any) => any) {
    return (ev: any) => callback(ev);
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
