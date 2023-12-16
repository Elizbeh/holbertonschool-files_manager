import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client not connected: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const asyncGet = promisify(this.client.get).bind(this.client);
      const value = await asyncGet(key);
      return JSON.parse(value);
    } catch (error) {
      console.log(`Error getting value from redis: ${error}`);
      return null;
    }
  }

  async set(key, value, duration) {
    const asyncSet = promisify(this.client.set).bind(this.client);
    await asyncSet(key, JSON.stringify(value), 'EX', duration);
  }

  async handleError(error) {
    console.log(`Error getting value from redis: ${error}`);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    try {
      await asyncDel(key);
    } catch (error) {
      console.log(`Error deleting value: ${error}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
