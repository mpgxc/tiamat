import Redis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT ?? 6379),
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};

const redisConnection = new Redis(options);

export { redisConnection };
