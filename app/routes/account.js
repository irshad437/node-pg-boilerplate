'use strict'

const Joi = require('@hapi/joi')
const user_controller = require('../controllers/user/user_controller')
const fail_action = require('../helper/error/fail_action')

let mx = [
  {
    method: 'GET',
    path: '/api/user/profile',
    config: {
      handler: user_controller.profile,
      validate: {
        failAction: fail_action,
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
]

module.exports = mx
