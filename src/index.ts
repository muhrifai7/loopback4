import {LoopBackApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {LoopBackApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LoopBackApplication(options);
  await app.boot();
  await app.start();
  // if want to migrate
  // await app.migrateSchema();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
