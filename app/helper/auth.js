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
  },
  start_session: async (access_token, userObj) => {
    // save direct token
    await cache_helper
      .set(access_token, JSON.stringify(userObj), config.auth_timeout.user)
      .catch((e) => {
        throw e
      })
    // save direct token ends

    // save reverse mapping of access token
    let existingSessions = await cache_helper.get(userObj.id).catch((e) => {
      throw e
    })

    if (existingSessions) {
      existingSessions = JSON.parse(existingSessions)
      existingSessions.push(access_token)
    } else {
      existingSessions = [access_token]
    }

    await cache_helper
      .set(userObj.id, JSON.stringify(existingSessions))
      .catch((e) => {
        throw e
      })
    // save reverse mapping of access token ends

    return true
  },
  end_session: async (user_id, access_token) => {
    await cache_helper.del(access_token).catch((e) => {
      throw e
    })

    // delete reverse mapping of access token
    let existingSessions = await cache_helper.get(user_id).catch((e) => {
      throw e
    })

    if (existingSessions) {
      existingSessions = JSON.parse(existingSessions)

      var index = existingSessions.indexOf(access_token)
      if (index > -1) {
        existingSessions.splice(index, 1)

        await cache_helper
          .set(user_id, JSON.stringify(existingSessions))
          .catch((e) => {
            throw e
          })
      }
    }
    // delete reverse mapping of access token ends
    return true
  }
}

module.exports = auth
