const Joi = require('@hapi/joi')
const fail_action = require('../helper/error/fail_action')

module.exports = [
  {
    method: 'GET',
    path: '/v1.0/user/account/create',
    options: {
      handler: function (req, h) {
        return 'hello there'
      },
      tags: ['api', 'user', 'account'],
      description: 'Create user account',
      validate: {
        query: Joi.object({
          limit: Joi.number()
        }),
        failAction: fail_action
      }
    }
  }
]
