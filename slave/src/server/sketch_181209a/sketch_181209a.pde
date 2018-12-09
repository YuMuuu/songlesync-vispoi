import processing.net.*;

int port = 3000;

Server server;

void setup() {
 server = new Server(this, port);
}

void draw() {
Client client = server.available();
if (client !=null) {
String whatClientSaid = client.readString();
if (whatClientSaid != null) {
println(whatClientSaid); 
 } 
 } 
}
