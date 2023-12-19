import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.error(`Redis client error: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
