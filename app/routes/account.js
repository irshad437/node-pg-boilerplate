'use strict'

const account_helper = require('../helper/user/account')
const Joi = require('@hapi/joi')
const user_auth_controller = require('../controllers/user/user_auth_controller')
const fail_action = require('../helper/error/fail_action')

let mx = [
  {
    method: 'POST',
    path: '/api/user/auth/signup',
    config: {
      pre: [{ method: account_helper.verify_unique_user }],
      handler: user_auth_controller.signup,
      validate: {
        payload: Joi.object({
          first_name: Joi.string().min(2).max(60).required(),
          last_name: Joi.string().allow('').max(60),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          above18_fair_use: Joi.boolean().required(),
          mobile: Joi.string()
        }),
        failAction: fail_action
      }
    }
  },
  {
    method: 'POST',
    path: '/api/user/auth/login',
    config: {
      handler: user_auth_controller.login,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }),
        failAction: fail_action
      }
    }
  }
]

module.exports = mx
