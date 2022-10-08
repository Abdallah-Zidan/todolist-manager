import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import morgan from 'morgan';
import { handleHttpError, isHttpError } from './errors';
import z from 'zod';
import { getLocalLogger } from './logger';

export function commonMiddlewares() {
  return [
    helmet(),
    express.json({ limit: config.app.requestBodyLimit }),
    express.urlencoded({
      extended: true,
      limit: config.app.requestBodyLimit ,
    }),
    cors(),
    morgan(config.isProduction() ? 'tiny' : 'dev'),
  ];
}

const errorLogger = getLocalLogger('ErrorHandler');

export function errorHandler(app: express.Application) {
  app.use(
    (
      err: Error,
      _1: express.Request,
      res: express.Response,
      _2: express.NextFunction,
    ) => {
      errorLogger.log({
        message: err.message ?? err.name,
        options: {
          level: 'error',
        },
        meta: err,
      });
      if (isHttpError(err)) return handleHttpError(err, res);
      else res.status(500).send('unexpected error happened');
    },
  );
}

export function notFoundHandler(app: express.Application) {
  app.use((req, res) => {
    res.status(404).send({ message: 'resource not found' });
  });
}

export function validate(schema: z.Schema, key: 'body' | 'query' | 'params'| 'headers'="body",whitelist=true)
{
  return async function(req: express.Request, res: express.Response, next: express.NextFunction) {
    const result = await schema.safeParseAsync(req[key]);
    if (result.success) {
      if(whitelist) {
        req[key] = result.data;
      }
      next();
    } else {
      res.status(422).send(result.error.errors);
    }
  };
}
