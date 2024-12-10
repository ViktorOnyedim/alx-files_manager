import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.log(err));
        this.connected = false;
        this.client.on('connect', () => {
            this.connected = true;
        });
    }
    
    isAlive() {
        return this.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    console.log('Error getting key from Redis:', err);
                    return reject(err);
                }
                resolve(value);
            });
        });
        // return await this.client.get(key);
    }

    async set(key, value, dur) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', dur, (err) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve();
            });
        })
        // return await this.client.set(key, value);
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
              if (err) {
                console.log('Error deleting key from Redis:', err);
                return reject(err);
              }
              resolve();
            });
          });
        // return await this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
