const { DataTypes } = require('sequelize');
const db = require('../config/database');
// const sequelize = new Sequelize('sqlite::memory:');

const Offer = db.define('offer', {
  // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bonus: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName:'offer'
  // Other model options go here
});



db.sync({alter:true})

module.exports = Offer;