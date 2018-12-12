import * as  net from "net";
const port: number = 3000;
const host: any = "localhost";

enum ActionTypes {
  data,
  error,
  close,
}

class Client {
  constructor() {
    const client = new net.Socket();
    client.connect(port, host, () => {
      console.log("Connected : " + host + ":" + port);
      client.write("Hello world!");
    });
  }
  public on(Action: ActionTypes, callback: (ev: net.Socket) => any) {
    (ev: net.Socket) => callback(ev);
  }
}

// const foo = new Client;
// foo.on(ActionTypes.data, (data) => console.log("Send Data : " + data));
// foo.on(ActionTypes.error, (err) => console.log("Client: " + err));
// foo.on(ActionTypes.data, (close) => console.log("Connection closed"));
