const { DataTypes } = require('sequelize');
const db = require('../config/database')
const User = require('./User')
// const sequelize = new Sequelize('sqlite::memory:');

const Sim = db.define('sim', {
  // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        unique: true,
        primaryKey: true,
        
    },
    operatorName: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    ICCID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique:true,
    },
    simNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique:true,
    },
    salesPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    saleStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    },
    approvalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    },
    orderedAt: {
        type: DataTypes.DATE,
        allownNull: false,
      
    }
}, {
    tableName:'sim'
  // Other model options go here
});



db.sync({alter:true})

module.exports = Sim