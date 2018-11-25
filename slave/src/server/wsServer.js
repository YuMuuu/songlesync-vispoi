"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var port = 8888;
var wss = new ws_1.Server({ port: port });
console.log("listening port: " + port);
wss.on('connection', function (ws) {
    console.log('connection');
    ws.on('message', function (msg) {
        console.log('received: %s', msg);
        ws.send('Hello from ws');
    });
    ws.on('close', function () {
        console.log('close');
    });
});
