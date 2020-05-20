/* eslint-disable no-undef */
const redis = require('redis')
const config = require('../../config')

let client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)

client.on('connect', function () {
  console.log('Redis client connected')
})

client.on('unhandledRejection', function (e) {
  console.log('Redis Error', e)
})

module.exports = {
  get: async function (key) {
    console.log('CACHE_GET_1', key)
    return new Promise((resolve, reject) => {
      let wait = setTimeout(() => {
        clearTimeout(wait)
        reject(new Error(`Cache Timeout : redis`))
      }, config.redis.TIMEOUT_IN_MS)

      client.get(key, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          console.log('CACHE_GET', key, result)
          resolve(result)
        }
      })
    })
  },
  set: async function (...args) {
    let key = args[0]
    let value = args[1]
    let ttl = args[2]

    console.log('CACHE_SET', key, value)
    return new Promise((resolve, reject) => {
      console.info('CACHE_SET', key, value)

      if (ttl) {
        client.set(key, value, 'EX', ttl, (err, d) => {
          if (err) {
            console.error('CACHE_SET_ERROR', err)
            reject(err)
          }
          console.info('CACHE_SET_SUCCESS', d)
          resolve(d)
        })
      } else {
        client.set(key, value, (err, d) => {
          if (err) {
            console.error('CACHE_SET_ERROR', err)
            reject(err)
          }
          console.info('CACHE_SET_SUCCESS', d)
          resolve(d)
        })
      }
    })
  },
  del: async (key) => {
    return new Promise((resolve, reject) => {
      client.del(key, (err, reply) => {
        if (err) reject(err)
        resolve(reply)
      })
    })
  },
  incr: async (key) => {
    return new Promise((resolve, reject) => {
      client.incr(key, (err, d) => {
        if (err) reject(err)
        resolve(d)
      })
    })
  },
  mget: async (keys) => {
    return await new Promise((resolve, reject) => {
      client.mget(keys, (err, result) => {
        if (err) {
          console.log(err)
          reject(new Error(err))
        } else {
          console.log('CACHE_GET', keys, result)
          resolve(result)
        }
      })
    })
  },
  keys: async (pattern) => {
    console.log('*******************', client.keys)
    return await new Promise((resolve, reject) => {
      client.keys(pattern, (err, result) => {
        if (err) {
          console.log(err)
          reject(new Error(err))
        } else {
          console.log('CACHE_GET', result)
          resolve(result)
        }
      })
    })
  }
}
