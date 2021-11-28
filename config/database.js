const { Sequelize } = require('sequelize')

module.exports = new Sequelize('sim', 'root', 'passforroot123', {
    host: 'localhost', 
  dialect: 'postgres',
    port:5432
  });
