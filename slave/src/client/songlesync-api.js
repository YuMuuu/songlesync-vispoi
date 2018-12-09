var sa = require('songle-api');
var sw = require('songle-widget');
var NUM_LEDS = parseInt(process.argv[2], 10) || 10;
var settings = require('./settings');
var player = new sa.Player({
    accessToken: settings.tokens.access
});
player.addPlugin(new sa.Plugin.Beat);
player.addPlugin(new sw.Plugin.Chord);
player.addPlugin(new sa.Plugin.SongleSync);
var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["PLAY"] = 0] = "PLAY";
    ActionTypes[ActionTypes["SEEK"] = 1] = "SEEK";
    ActionTypes[ActionTypes["PAUSE"] = 2] = "PAUSE";
    ActionTypes[ActionTypes["FINISH"] = 3] = "FINISH";
    ActionTypes[ActionTypes["BEATPLAY"] = 4] = "BEATPLAY";
    ActionTypes[ActionTypes["CHROEDPLAY"] = 5] = "CHROEDPLAY";
})(ActionTypes || (ActionTypes = {}));
var Player = /** @class */ (function () {
    function Player() {
    }
    Player.prototype.on = function (Action, callback) {
        (function (ev) { return callback(ev); });
    };
    return Player;
}());
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
