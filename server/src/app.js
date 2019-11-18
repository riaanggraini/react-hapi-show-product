'use strict'

import Hapi from 'hapi';
import {CronJob} from 'cron'
import { productController } from '../src/controllers'

process.on('uncaughtException', err => {
    console.log(err, 'Uncaught exception')
    process.exit(1)
  })
  
  process.on('unhandledRejection', (reason, promise) => {
    console.log({
      promise: promise,
      reason: reason
    }, 'unhandledRejection')
    process.exit(1)
  })

  const job = new CronJob('30 * * * * *', async()=> {
    await productController.saveAllProductInDB()
  }, null, true, 'America/Los_Angeles');

  console.log('After job instantiation');
  job.start()
  console.log('is job running? ', job.running);

const app = Hapi

export default app;