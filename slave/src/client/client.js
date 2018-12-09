"use strict";
exports.__esModule = true;
var net = require("net");
var port = 3000;
var host = "localhost";
var Main = /** @class */ (function () {
    function Main() {
        var client = new net.Socket();
        client.connect(port, host, function () {
            console.log('Connected : ' + host + ':' + port);
            client.write("Hello world!");
        });
        client.on('data', function (data) {
            console.log('Send Data : ' + data);
            // client.destroy();
        });
        client.on('error', function (err) {
            console.log('Client: ' + err.stack);
        });
        client.on('close', function () {
            console.log('Connection closed');
        });
    }
    return Main;
}());
var main = new Main();
