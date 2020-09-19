/* eslint-disable no-undef */
const auth_helper = require('./auth')
const constants = require('../constants/code')
const models = require('../models')

module.exports = {
  bearer_token: async (req, h) => {
    let path = req.url.pathname
    if (
      // path.indexOf('admin') === -1 &&
      path.indexOf('auth') == -1 &&
      path.indexOf('webhook') == -1 &&
      path.indexOf('documentation') == -1 &&
      path.indexOf('swagger') == -1
    ) {
      try {
        let token = req.headers.authorization.split(' ')[1]
        if (token) {
          console.log('bearer_token: ', token)
          let d = await auth_helper.verify_token(token).catch((e) => {
            throw e
          })

          // set data in req.user for routes to access
          req['user'] = d
          return h.continue
        } else {
          return h
            .response({
              success: false,
              message: 'Authorization Required, Token not specified'
            })
            .code(403)
            .takeover()
        }
      } catch (e) {
        return h
          .response({
            success: false,
            statusCode: 403,
            message: 'Authorization Required'
          })
          .code(403)
          .takeover()
      }
    } else {
      return h.continue
    }
  }
}
