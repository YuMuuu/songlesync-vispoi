"use strict";
exports.__esModule = true;
// tslint:disable-next-line:no-var-requires
var sa = require("songle-api");
// tslint:disable-next-line:no-var-requires
var sw = require("songle-widget");
// tslint:disable-next-line:no-var-requires
var settings = require("./settings");
// tslint:disable-next-line:no-var-requires
var ws281x = require("rpi-ws281x-native");
var player = new sa.Player({
    accessToken: settings.tokens.access
});
var NUM_LEDS = parseInt(process.argv[2], 10) || 10; // 繋いでるLEDの数を第一引数で取得
var pixelData = new Uint32Array(NUM_LEDS);
ws281x.init(NUM_LEDS);
process.on("SIGINT", function () {
    // 終了時処理
    // これ記述しないとprocessが終了しなくて辛い
    ws281x.reset();
    console.log(">>> system end");
    process.nextTick(function () { return process.exit(0); });
});
var chorusSectionFlag = false; // 曲のサビかどうか
var chordName = "N";
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.Beat);
// tslint:disable-next-line:new-parens
player.addPlugin(new sw.Plugin.Chord);
// tslint:disable-next-line:new-parens
player.addPlugin(new sa.Plugin.SongleSync);
console.log("system start >>>");
player.on("play", function (ev) { return console.log("play"); });
player.on("seek", function (ev) { return console.log("seek"); });
player.on("pause", function (ev) {
    console.log("pause");
    flash(0, 0, 0);
});
player.on("finish", function (ev) {
    console.log("finish");
    flash(0, 0, 0);
});
player.on("beatPlay", function (ev) {
    // console.log("beat:", ev.data.beat.position);
    beatflash(ev.data.beat.position);
});
player.on("chordPlay", function (ev) {
    console.log("chordName:", ev.data.chord.name);
    var str = ev.data.chord.name;
    // const str2 = str.match(/^[A-G|N]?[#|b]?(m|sus|add|dim|aug||)/u)!;
    var str2 = str.match(/^[A-G|N]?[#|b]?(m||)/u);
    if (str2[0] != null) {
        chordName = str2[0];
    }
    console.log("easy chordName:", chordName);
});
player.on("chorusSectionEnter", function (ev) {
    console.log("chorusSection enter");
    chorusSectionFlag = true;
});
player.on("chorusSectionLeave", function (ev) {
    console.log("chorusSection leave");
    chorusSectionFlag = false;
});
function beatflash(beat) {
    var i = 150;
    if (chorusSectionFlag) {
        i = 255;
    }
    else {
        i = 150;
    }
    // if (beat === 1) {
    //   flash(i, 0, 0);
    // } else if (beat === 2) {
    //   flash(0, i, 0);
    // } else if (beat === 3) {
    //   flash(0, 0, i);
    // } else if (beat === 4) {
    //   flash(i, i, i);
    // } else {
    //   console.log("error dayon");
    // }
    if (beat === 1) {
        bright(i);
    }
    else if (beat === 2) {
        bright(i);
    }
    else if (beat === 3) {
        bright(i);
    }
    else if (beat === 4) {
        bright(i);
    }
    else {
        console.log("error dayon");
    }
}
function bright(i) {
    var theta = ChordToTheta(chordName);
    var RGB = HSVtoRGB(theta);
    var R = RGB[0] * 255;
    var G = RGB[1] * 255;
    var B = RGB[2] * 255;
    for (var j = i; j > 30; j--) {
        var r = R - j;
        var g = G - j;
        var b = B - j;
        if (r < 0) {
            r = 0;
        }
        if (g < 0) {
            g = 0;
        }
        if (b < 0) {
            b = 0;
        }
        flash(r, g, b);
    }
}
function HSVtoRGB(theta) {
    var hue = Hue(theta);
    var C = 1;
    var X = x(theta);
    // chordがNだったらwhitecolorを返す
    if (theta == 0) {
        return [1, 1, 1];
    }
    // tslint:disable-next-line:no-bitwise
    switch (hue / 6 | 0) {
        case 0:
            return [C, X, 0];
        case 1:
            return [X, C, 0];
        case 2:
            return [0, C, X];
        case 3:
            return [0, X, C];
        case 4:
            return [X, 0, C];
        case 5:
            return [C, 0, X];
        default:
            return [0, 0, 0];
    }
}
function Hue(theta) {
    return theta / 60;
}
function x(theta) {
    return 1 - Math.abs(Hue(theta) % 2 - 1);
}
function ChordToTheta(chord) {
    switch (chord) {
        case "A": return 15;
        case "Am": return 30;
        case "A#": return 45;
        case "Bb": return 45;
        case "A#m": return 60;
        case "Bbm": return 60;
        case "B": return 75;
        case "Cb": return 75;
        case "Bm": return 90;
        case "Cbm": return 90;
        case "C": return 105;
        case "B#": return 105;
        case "Cm": return 120;
        case "C#": return 135;
        case "Db": return 135;
        case "C#m	": return 150;
        case "Dbm	": return 150;
        case "D": return 165;
        case "Dm": return 180;
        case "D#": return 195;
        case "Eb": return 195;
        case "D#m": return 210;
        case "Ebm": return 210;
        case "E": return 225;
        case "Fb": return 225;
        case "Em": return 240;
        case "Fbm": return 240;
        case "F": return 255;
        case "E#": return 255;
        case "Fm": return 270;
        case "F#": return 285;
        case "Gb": return 285;
        case "F#m": return 300;
        case "Gbm": return 300;
        case "G": return 315;
        case "Gm": return 330;
        case "G#": return 345;
        case "Ab": return 345;
        case "G#m": return 360;
        case "Abm": return 360;
        // chordの値がN(null)や異常系だった場合は0を返す
        case "N": return 0;
        default: return 0;
    }
}
function flash(r, g, b) {
    for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = rgb2Int(r, g, b);
    }
    ws281x.render(pixelData);
}
function rgb2Int(r, g, b) {
    // tslint:disable-next-line:no-bitwise
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
// tslint:disable-next-line:no-empty
setInterval(function () { }, 10000);
