import websockets.*;

WebsocketClient wsc;
private final String message = "";
private final int port = 8888;


public void setup(){
  size(400,400);
  wsc = new WebsocketClient(this, "ws://localhost:" + port);
  wsc.sendMessage("hage");

}

public void draw(){
  background(255);
  fill(0);
  }


public void webSocketEvent(String msg){
 println(msg);
}
