import { Container } from 'inversify';

declare namespace global{
  let __app__container: Container;
}

export default function getContainer(): Container {
  if (!global.__app__container) global.__app__container = new Container();
  return global.__app__container;
}
