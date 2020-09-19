'use strict'

const Joi = require('@hapi/joi')
const user_controller = require('../controllers/user/user_controller')
const fail_action = require('../helper/error/fail_action')

let mx = [
  {
    method: 'PUT',
    path: '/api/user/logout',
    options: {
      description: 'Logout',
      tags: ['api'],
      handler: user_controller.logout,
      validate: {
        failAction: fail_action,
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    method: 'GET',
    path: '/api/user/profile',
    options: {
      description: 'Get user profile',
      tags: ['api'],
      notes: 'Order Cost',
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
