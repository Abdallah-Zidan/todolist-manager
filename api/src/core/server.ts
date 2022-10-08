import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { buildProviderModule } from 'inversify-binding-decorators';

import getContainer from './container';

export default async function setup(app:express.Application){
  const container = getContainer();
  container.load(buildProviderModule());
  const server = new InversifyExpressServer(container,null,null,app);
  return server.build();
}

