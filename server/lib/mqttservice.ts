import type { IClientOptions, MqttClient } from 'mqtt';
import mqtt from 'mqtt';

// Change this to point to your MQTT broker or DNS name
const mqttHost = '191.123.11.87';
const protocol = 'ws';
const port = '8883';
const clientId = `${Math.random().toString(36).substring(7)}`;

// Change this to point to your MQTT broker
const hostURL = `${protocol}://${mqttHost}:${port}/mqtt`;

const options: IClientOptions = {
  // keepalive: 60,
  clientId,
  clean: true,
  // protocolId: 'MQTT',
  protocolVersion: 4,
  // clean: true,
  reconnectPeriod: 3000,
  connectTimeout: 30 * 1000,
};

const mqttClient: MqttClient = mqtt.connect(hostURL, options);

mqttClient.on('error', (_err: Error) => {
  // eslint-disable-next-line no-console
  console.log('Connection error');
  mqttClient.end();
});

mqttClient.on('reconnect', () => {
  // eslint-disable-next-line no-console
  console.log('Reconnecting...');
});

mqttClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log(`Client connected: ${clientId}`);
});
mqttClient.on('offline', () => {
  // eslint-disable-next-line no-console
  console.log(`Client is offline`);
});

const publishMessage = (topic: string, message: string) => {
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
};

const subscribeToTopic = (topic: string) => {
  mqttClient.subscribe(topic, { qos: 2 });
};
export { mqttClient, publishMessage, subscribeToTopic };
