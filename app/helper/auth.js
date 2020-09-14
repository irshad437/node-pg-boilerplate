const config = require('../../config')
const crypto = require('crypto')
const cache_helper = require('../helper/cache')

function generateRandomString(len = 256) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len)
}

let auth = {
  generate_token: async function () {
    let tokenExists = false
    let access_token
    do {
      access_token = generateRandomString()
      tokenExists = await cache_helper.get(access_token).catch((e) => {
        throw e
      })
    } while (tokenExists)

    return access_token
  },
  verify_token: async (token) => {
    let d = await cache_helper.get(token).catch((e) => {
      throw e
    })

    if (d) {
      try {
        // reset expire time
        await cache_helper.set(token, d, config.auth_timeout.user)

        return JSON.parse(d)
      } catch (e) {
        throw new Error('Invalid token')
      }
    } else {
      throw new Error('Invalid token')
    }
  }
}

module.exports = auth
