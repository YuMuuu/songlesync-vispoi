import { Server } from 'ws';

const port: number = 8888;
const wss = new Server({ port });


console.log("listening port: " + port);

wss.on('connection', (ws) => {
  console.log('connection');

  ws.on('message', (msg: string) => {
    console.log('received: %s', msg);

    ws.send('Hello from ws');
  });

  ws.on('close', () => {
    console.log('close');
  });
});
