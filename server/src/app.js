'use strict'

import Hapi from 'hapi';

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

const app = Hapi

export default app;