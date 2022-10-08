import winston from 'winston';
import config from './config';
import * as path from 'path';

declare namespace global {
  let __winston__: winston.Logger;
}

const logFilename = path.join(path.resolve(config.logger.directory), `${config.app.appName}.log`);

const transports =
  config.isProduction()
    ? [
      new winston.transports.File({
        filename: logFilename,
      }),
    ]
    : [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.File({
        filename: logFilename,
        format: winston.format.json(),
        maxsize: config.logger.maxFileSize,
        maxFiles: config.logger.maxFiles,
      }),
    ];

if (!global.__winston__) {
  global.__winston__ = winston.createLogger({
    transports,
  });
}

const localLogger: winston.Logger = global.__winston__;

export class LocalLogger implements ILogger {
  constructor(private name: string) {
  }

  log({ message, meta, options }: ILoggable) {
    const data = {
      app: config.app.appName,
      env: config.app.nodeEnv,
      meta: meta ?? {},
      timestamp: options?.timestamp ?? Date.now(),
      level: options?.level ?? 'info',
      context: {
        name: this.name,
      },
    };
    message = `[${this.name}] ${message}`;
    switch (options?.level) {
      case 'info':
        localLogger.info(message, data);
        break;
      case 'warn':
        localLogger.warn(message, data);
        break;
      case 'error':
        localLogger.error(message, data);
        break;
      case 'debug':
        localLogger.debug(message, data);
        break;
      default:
        localLogger.info(message, data);
    }
  }
}

export function getLocalLogger(name: string) {
  return new LocalLogger(name);
}

export interface ILoggable {
  message: string;
  meta?: any;
  options?: {
    timestamp?: number;
    level?: 'info' | 'warn' | 'error' | 'debug' | 'trace';
  };
}

export interface ILogger {
  log: (loggedObject: ILoggable) => void;
}