const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Sim = require('./Sim')
// const sequelize = new Sequelize('sqlite::memory:');

const User = db.define('user', {
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
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    }
}, {
    tableName:'user'
  // Other model options go here
});

User.hasMany(Sim, {
  foriegnKey:DataTypes.UUID
})
Sim.belongsTo(User)
module.exports = User