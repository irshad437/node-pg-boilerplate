const models = require('../../models')
const Boom = require('../../helper/error/boom_helper')
const response_handler = require('../../helper/response_handler')

let mx = {
  profile: async (req, h) => {
    let user = req.user

    // // get user data
    // let userObj = await models.user
    //   .findByPk(user.id, { raw: true })
    //   .catch((e) => {
    //     throw Boom.badRequest(req, e)
    //   })

    return response_handler.success(req, user, 'OK', h)
  }
}

module.exports = mx
