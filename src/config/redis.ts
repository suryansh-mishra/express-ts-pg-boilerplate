import logger from '@config/logger.js';
import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  logger.info('Connected to redis');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (err: Error) => {
  console.log(err.message);
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

process.on('SIGINT', () => {
  client.quit();
});

export default client;
