/* eslint-disable no-console */
// var mosca = require('mosca');
// var settings = {
//   port: 1883,
//   http: {port: 8883}
// };
const aedes = require('aedes')();
const server = require('node:net').createServer(aedes.handle);
const httpServer = require('node:http').createServer();
const ws = require('websocket-stream');

const MQTT_Port = 1883;
const wsPort = 8883;

server.listen(MQTT_Port, () => {
  console.log('Aedes MQTT server started and listening on port ', MQTT_Port);
});

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(wsPort, () => {
  console.log('websocket server listening on port', wsPort);
});
// var server = new mosca.Server(settings);
// server.on('ready', setup);// emitted when a client connects to the broker
aedes.on('client', (client) => {
  console.log(`CLIENT_CONNECTED : MQTT Client ${(client ? client.id : client)} connected to aedes broker ${aedes.id}`);
});
// emitted when a client disconnects from the broker
aedes.on('clientDisconnect', (client) => {
  console.log(`CLIENT_DISCONNECTED : MQTT Client ${(client ? client.id : client)} disconnected from the aedes broker ${aedes.id}`);
});
// emitted when a client subscribes to a message topic
aedes.on('subscribe', (subscriptions, client) => {
  console.log(`TOPIC_SUBSCRIBED : MQTT Client ${(client ? client.id : client)} subscribed to topic: ${subscriptions.map(s => s.topic).join(',')} on aedes broker ${aedes.id}`);
});
// emitted when a client unsubscribes from a message topic
aedes.on('unsubscribe', (subscriptions, client) => {
  console.log(`TOPIC_UNSUBSCRIBED : MQTT Client ${(client ? client.id : client)} unsubscribed to topic: ${subscriptions.join(',')} from aedes broker ${aedes.id}`);
});
// emitted when a client publishes a message packet on the topic
aedes.on('publish', (packet, client) => {
  if (client) {
    console.log(`MESSAGE_PUBLISHED : MQTT Client ${(client ? client.id : `AEDES BROKER_${aedes.id}`)} has published message "${packet.payload}" on ${packet.topic} to aedes broker ${aedes.id}`);
  }
});
