'use strict'

import app from './app';
import config from 'config';
import {v1Routes} from '../src/routes'

const port = process.env.PORT || config.get('app.port');
const server = new app.Server(
  { port, 
    host: config.get('app.host') ,
    routes: {
      cors: true
  }
});


const serverInfo = async function () {
  try {
    await server.start()
    console.info(`server started at port: ${config.get('app.port')} with env: ${config.util.getEnv('NODE_ENV')}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// routes
server.route(v1Routes.productRoutes)

serverInfo()

export default server
