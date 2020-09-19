// const models = require('../../models')
const response_handler = require('../../helper/response_handler')
const auth_helper = require('../../helper/auth')
const Boom = require('../../helper/error/boom_helper')

let mx = {
  profile: async (req, h) => {
    // let userObj = req.user

    // get user data
    let userObj = await models.user
      .findByPk(req.user.id, { raw: true })
      .catch((e) => {
        throw Boom.badRequest(req, e)
      })

    return response_handler.success(req, userObj, 'OK', h)
  },
  logout: async (req, h) => {
    let user_id = req.user.id
    let access_token = req.headers.authorization.split(' ')[1]

    await auth_helper.end_session(user_id, access_token).catch((e) => {
      throw Boom.badRequest(req, e)
    })

    return response_handler.success(req, {}, 'Logged out successfully', h)
  }
}

module.exports = mx
