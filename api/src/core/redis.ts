import IORedis from 'ioredis';
import config from './config';

export default new IORedis({
  host: config.dbs.redisHost,
  port: config.dbs.redisPort,
  password: config.dbs.redisPassword,
  username: config.dbs.redisUser,
});