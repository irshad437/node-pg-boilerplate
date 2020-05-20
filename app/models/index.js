'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const config = require('../../config')
const sequelize = new Sequelize(config.database.url, config.database.settings)

let db = {}

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection has been established successfully.',
      process.env.APP_ENV
    )
  })
  .catch((err) => {
    console.error(err)
    throw Boom.badRequest('Server Error')
  })

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js'
  })
  .forEach(function (file) {
    var model_files = path.join(__dirname, file)
    var model = sequelize['import'](model_files)
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// Sequelize.prototype.close = ()=>{

//   sequelize.connectionManager.pool.destroyAllNow();

// }

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
