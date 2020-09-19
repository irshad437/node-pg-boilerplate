/* eslint-disable no-unused-vars */
const models = require('../app/models')

/**
 * Sync(create) a table using the table structure
 * present in the ../models/{file}
 */
let startMigration = async () => {
  await models.user
    .sync({
      force: false,
      logging: console.log
    })
    .catch((e) => {
      console.log(e)
    })
}

startMigration()
