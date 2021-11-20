const { Sequelize } = require('sequelize')

module.exports = new Sequelize('sim', 'postgres', 'pass123', {
    host: 'localhost',
    dialect: 'postgres' 
  });