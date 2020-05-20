'use strict'

const Hapi = require('@hapi/hapi')
const config = require('./config')
const validate_helper = require('./app/helper/validate')
const glob = require('glob')
const path = require('path')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost'
  })

  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob
    .sync('app/routes/**/*.js', {
      root: __dirname
    })
    .forEach((file) => {
      const route = require(path.join(__dirname, file))
      server.route(route)
    })

  server.ext('onRequest', async (req, h) => {
    return await validate_helper.bearer_token(req, h)
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
