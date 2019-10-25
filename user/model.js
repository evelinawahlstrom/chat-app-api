const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    // makes sure the email is unique
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    /// below, allowNull determines that the field must be 
    //  populated with a password, same goes for email
    allowNull: false
  },
})

module.exports = User