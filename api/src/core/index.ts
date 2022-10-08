import setup from './server';
import express from 'express';
import config from './config';
import { commonMiddlewares, errorHandler, notFoundHandler } from './middlewares';

export default async function bootstrap(
  {
    applyCommonMiddlewares = false,
    beforeAll = () => {
    },
    afterSetup = () => {
    },
    errorHandlerMiddleware = errorHandler,
    notFoundHandlerMiddleware = notFoundHandler,
  }: Configurations={}) {

  let app = express();

  await beforeAll(app);

  if (applyCommonMiddlewares) {
    app.use(commonMiddlewares());
  }

  const server = await setup(app);

  await afterSetup(server);

  await errorHandlerMiddleware(server);

  await notFoundHandlerMiddleware(server);

  server.listen(config.app.port, () => {
    console.log(`server running and available at ${config.app.appUrl}`);
  });
}

type LifeCycleHook = (app: express.Application) => Promise<void> | void;

export interface Configurations {
  /**
   * @description specify whether to apply common middlewares (body parsing , helmet ,etc...)
   * @default true
   */
  applyCommonMiddlewares?: boolean;
  /**
   * @description hook that will be called before registering any middlewares to the app
   */
  beforeAll?: LifeCycleHook;
  /**
   * @description hook that will run after registering everything and just before start listening
   */
  afterSetup?: LifeCycleHook;

  /***
   * @description error handling middleware
   */
  errorHandlerMiddleware?: LifeCycleHook;

  /***
   * @description middleware to handle unknown or unregistered routes
   */
  notFoundHandlerMiddleware?: LifeCycleHook;
}