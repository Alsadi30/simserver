const { Sequelize } = require('sequelize')

module.exports = new Sequelize('sims', 'root', 'passforroot123', {
    host: 'localhost', 
  dialect: 'postgres',
    port:5432
  });