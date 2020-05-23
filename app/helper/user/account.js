'use strict'

const Boom = require('../../helper/error/boom_helper')
const models = require('../../models')

let mx = {
  verify_unique_user: async (req, h) => {
    // Find an entry from the database that
    // matches either the email or username
    let user = await models.user.findOne({
      where: { email: req.payload.email }
    })

    // Check whether the username or email
    // is already taken and error out if so
    if (user) {
      throw Boom.badRequest(req, 'Email already exists')
    }

    // If everything checks out, send the payload through
    // to the route handler
    return req.payload
  }
}

module.exports = mx
