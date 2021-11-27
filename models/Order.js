const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');
// const sequelize = new Sequelize('sqlite::memory:');

const Order = db.define('order', {
  // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        primaryKey: true
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfproduct: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
  }
}, {
    tableName:'order'
  // Other model options go here
});

User.hasMany(Order, {
    foriegnKey:DataTypes.UUID
  })
Order.belongsTo(User)

db.sync({alter:true})

module.exports = Order