'use strict'
const constants = require('../constants/code')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      fcm_token: {
        type: DataTypes.STRING
      },
      above18_fair_use: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
      },
      user_type: {
        type: DataTypes.INTEGER,
        defaultValue: constants.USER_TYPE.USER
      }
    },
    {
      underscored: true
    }
  )
}
