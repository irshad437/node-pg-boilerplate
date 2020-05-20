const bcrypt = require('bcrypt')
const models = require('../../models')
const Boom = require('../../helper/error/boom_helper')
const auth_helper = require('../../helper/auth')
const constants = require('../../constants/code')
const response_handler = require('../../helper/response_handler')
const config = require('../../../config')
const cache_helper = require('../../helper/cache')

async function hashPassword(password) {
  const saltRounds = config.salt_rounds

  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

let mx = {
  signup: async (req, h) => {
    let user = {
      first_name: req.payload.first_name,
      last_name: req.payload.last_name,
      email: req.payload.email,
      mobile: req.payload.mobile,
      user_type: constants.USER_TYPE.USER,
      above18_fair_use: req.payload.above18_fair_use
    }

    let hash = await hashPassword(req.payload.password)
    user.password = hash

    // create user
    await models.user.create(user).catch((e) => {
      throw Boom.badRequest(req, e)
    })

    // If the user is saved successfully, issue a JWT
    let access_token = await auth_helper
      .generate_token(user, constants.USER_TYPE.USER)
      .catch((e) => {
        throw Boom.badRequest(req, e)
      })

    delete user.password
    delete user.above18_fair_use

    // set accecss token in cache
    await cache_helper
      .set(access_token, JSON.stringify(user), config.auth_timeout.user)
      .catch((e) => {
        throw Boom.badRequest(req, e)
      })

    return response_handler.success(req, { access_token }, 'OK', h)
  }
}

module.exports = mx
