const { DataTypes } = require('sequelize');
const db = require('../config/database')

// const sequelize = new Sequelize('sqlite::memory:');

const Admin = db.define('admin', {
  // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName:'admin'
  // Other model options go here
});


module.exports = Admin