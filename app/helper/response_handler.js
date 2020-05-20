const config = require('../../config')

module.exports = {
  web_success: (req, data, msg, h) => {
    req.log(
      '\n\n\n\n\n =============================================================================='
    )
    req.log(
      '%c ADMIN_API_RESPONSE_SUCCESS',
      JSON.stringify({
        data,
        msg
      }),
      'background: #222; color: #bada55'
    )

    console.log({
      type: 'success',
      method: req.method,
      path: req.path,
      headers: req.headers,
      execution_time: `${req['x-execution-time']}`,
      payload: req.payload,
      query: req.query,
      response: {
        data,
        msg
      }
    })

    return h
      .response({
        success: true,
        data: data,
        message: msg
      })
      .code(200)
  },
  web_failure: (req, msg, h) => {
    req.log(
      '\n\n\n\n\n =============================================================================='
    )
    req.log(
      '%c ADMIN_API_RESPONSE_SUCCESS',
      JSON.stringify({
        msg
      }),
      'background: #222; color: #bada55'
    )

    console.log({
      type: 'error',
      method: req.method,
      path: req.path,
      headers: req.headers,
      execution_time: `${req['x-execution-time']}`,
      payload: req.payload,
      query: req.query,
      response: {
        msg
      }
    })

    return h
      .response({
        success: false,
        message: msg
      })
      .code(200)
  },
  success: (req, data, msg, h) => {
    var start = parseInt(req['x-request-start'])
    var end = new Date().getTime()

    req['x-execution-time'] = end - start

    let access_by = {}
    if (req.user) access_by['user'] = { id: req.user.id, type: 1 }
    if (req.rider) access_by['rider'] = { id: req.rider.id, type: 2 }

    console.log({
      type: 'success',
      method: req.method,
      path: req.path,
      headers: req.headers,
      execution_time: `${req['x-execution-time']}`,
      payload: req.payload,
      query: req.query,
      access_by: access_by,
      response: {
        data,
        msg
      }
    })

    req.log(
      '\n\n\n\n\n =============================================================================='
    )
    req.log(
      '%c API_RESPONSE_SUCCESS',
      JSON.stringify({
        data,
        msg
      }),
      'background: #222; color: #bada55'
    )

    let FINAL_RESPONSE = null

    FINAL_RESPONSE = {
      success: true,
      data: data,
      message: msg,
      meta: {}
    }

    if (req.path.indexOf('user/auth') != -1) delete FINAL_RESPONSE.meta

    return h.response(FINAL_RESPONSE).code(200)
  },
  failure: (msg, h) => {
    return h
      .response({
        success: false,
        data: {},
        message: msg
      })
      .code(500)
  },
  send_status_code: (status, msg, h) => {
    return h
      .response({
        success: false,
        data: {},
        message: msg
      })
      .code(status)
  },
  webFailure: (msg, h) => {
    return h
      .response({
        success: false,
        data: {},
        message: msg
      })
      .code(200)
  }
}
