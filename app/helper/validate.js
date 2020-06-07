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
          let d = await auth_helper.verify_global_token(token).catch((e) => {
            throw e
          })

          let constant_mapping = {
            admin: constants.USER_TYPE.ADMIN,
            user: constants.USER_TYPE.USER,
            rider: constants.USER_TYPE.RIDER
          }

          if (d.user_type === constant_mapping[path.split('/')[2]]) {
            let u_type = path.split('/')[2]
            // eslint-disable-next-line require-atomic-updates
            req[u_type] = d

            return h.continue
          } else {
            return h
              .response({
                success: false,
                message: 'Not Authorized'
              })
              .code(403)
              .takeover()
          }
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
        if (e.name == 'TokenExpiredError') {
          return h
            .response({
              success: false,
              statusCode: 463,
              message: 'Authorization Required ' + e.message
            })
            .code(463)
            .takeover()
        } else {
          return h
            .response({
              success: false,
              statusCode: 403,
              message: 'Authorization Required ' + e.message
            })
            .code(403)
            .takeover()
        }
      }
    } else {
      return h.continue
    }
  }
}
