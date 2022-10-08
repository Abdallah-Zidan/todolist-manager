import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();
export default {
  app: {
    appName: env('APP_NAME', 'Crud Task'),
    appUrl: env('APP_URL', 'http://localhost:3000'),
    nodeEnv: env('NODE_ENV', 'development'),
    port: Number(env('PORT')) || 3000,
    requestBodyLimit: env('REQUEST_BODY_LIMIT', '50mb'),
    createDemoUser: ['true', true].includes(env('CREATE_DEMO_USER', 'false').toLowerCase()),
  },

  dbs: {
    mongoUrl: env('MONGO_URL', 'mongodb://localhost:27017/'),
    dbName: env('MONGO_DATABASE', 'crud-task'),
    redisHost: env('REDIS_HOST', 'localhost'),
    redisPort: env('REDIS_PORT'),
    redisUser: env('REDIS_USR'),
    redisPassword: env('REDIS_PASSWORD'),
  },

  tokens: {
    jwtSecret: env('JWT_SECRET'),
    refreshJwtSecret: env('REFRESH_JWT_SECRET'),
    tokenExpiry: env('TOKEN_EXPIRY', '1h'),
    refreshTokenExpiry: env('REFRESH_TOKEN_EXPIRY', '8h'),
  },

  logger: {
    directory: env('LOG_FILES_DIRECTORY', 'logs'),
    maxFiles: Number(env('MAX_LOG_FILES', 5)) || 5,
    maxFileSize: Number(env('MAX_LOG_FILE_SIZE', 5242880)) || 5242880,
  },

  isDevelopment() {
    return ['dev', 'development', 'develop'].includes(this.app.nodeEnv.toLowerCase());
  },

  isProduction() {
    return ['prod', 'production'].includes(this.app.nodeEnv.toLowerCase());
  },

  isTesting() {
    return ['test', 'testing'].includes(this.app.nodeEnv.toLowerCase());
  },

  //* validate that all required env vars are set correctly
  isValidEnv() {
    return !!(process.env.JWT_SECRET && process.env.JWT_SECRET?.trim()?.length
      && process.env.REFRESH_JWT_SECRET && process.env.REFRESH_JWT_SECRET?.trim()?.length);
  },
};

function env(key: string, defaultValue?: any) {
  return process.env[key] || defaultValue;
}
