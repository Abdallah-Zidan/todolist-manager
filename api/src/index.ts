import 'reflect-metadata';
import mongoose from 'mongoose';

import './modules';
import bootstrap from './core';
import config from './core/config';

async function main(){
  await validEnvOrExit();
  await mongoose.connect(config.dbs.mongoUrl);
  await bootstrap({
    applyCommonMiddlewares:true,
  });
}

main().catch(err=>{
  console.error(err);
  process.exit(1);
});


async function validEnvOrExit(){
  if(!config.isValidEnv()){
    console.log("please ensure setting all the required environment variables properly");
    process.exit(2);
  }
}