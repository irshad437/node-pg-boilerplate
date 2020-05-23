require('dotenv').config()

let mx = {
  database: {
    url: process.env.DB_URL,
    settings: {
      pool: {
        /**
         * Pool Configuration is currently on the basis of StackOverFlow:
         * @url https://stackoverflow.com/questions/45802745/sequelize-timeouterror-resourcerequest-timed-out
         *
         * This is issue with sequelize which might be tracker here:
         * @url https://github.com/sequelize/sequelize/issues/7884
         *
         */
        min: 2,
        max: 20,
        idle: 20000, // As per Instructed by Sagar Sir
        acquire: 1000000,
        //evict: 60000,
        autostart: true,
        handleDisconnects: true
      },
      // retry_on_reconnect: {
      //   transactions: true,
      // },
      logging: false
      //operatorsAliases: false
    }
  },
  auth: {
    admin: {
      //"session_timeout":9999999999999999
      session_timeout: 9999999999999999
    },
    rider: {
      session_timeout: 9999999999999999
    },
    user: {
      session_timeout: 9999999999999999
    }
  },
  salt_rounds: 10,
  auth_timeout: {
    user: 86400
  },
  redis: {
    TIMEOUT_IN_MS: 2000
  }
}

module.exports = mx
