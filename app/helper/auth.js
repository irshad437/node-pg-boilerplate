const jwt = require('jsonwebtoken')
const config = require('../../config')
// const send = require("./send");
const constants = require('../constants/code')

let auth = {
  //   send_otp: async function (mobile) {
  //     return await send.otp(mobile).catch((err) => {
  //       throw err;
  //     });
  //   },
  //   resend_otp: async function (mobile) {
  //     return await send.resend_otp(mobile).catch((err) => {
  //       throw err;
  //     });
  //   },
  //   verify_otp: async function (mobile, otp) {
  //     return await send.verify_otp(mobile, otp).catch((e) => {
  //       throw e;
  //     });
  //   },
  generate_token: async function (user_data, user_type) {
    let dte = user_data
    dte['user_type'] = user_type

    let user_object =
      user_type == constants.USER_TYPE.ADMIN
        ? config.auth.admin
        : user_type == constants.USER_TYPE.RIDER
        ? config.auth.rider
        : config.auth.user
    return jwt.sign(dte, process.env.jwt_key, {
      expiresIn: user_object.session_timeout
    })
  },
  verify_token: async function (token) {
    return jwt.verify(token, process.env.jwt_key)
  },
  verify_global_token: async (token) => {
    return jwt.verify(token, process.env.jwt_key)
  }
}

module.exports = auth
