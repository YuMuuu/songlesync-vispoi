import * as  net from 'net';
const port: number = 3000;
const host: any = "localhost";

class Main {
  constructor() {
    const client = new net.Socket();

    client.connect(port, host, () => {
      console.log('Connected : ' + host + ':' + port);
      client.write("Hello world!");
    });

    client.on('data',  (data) => {
      console.log('Send Data : ' + data);
      // client.destroy();
    });

    client.on('error', (err) => {
      console.log('Client: ' + err.stack);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  }
}

const main = new Main();
