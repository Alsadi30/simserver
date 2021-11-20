const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Sim = require('./Sim')
// const sequelize = new Sequelize('sqlite::memory:');

const Attachment = db.define('attachment', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        unique: true,
        primaryKey: true,
        
    },
    file_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_2: {
        type: DataTypes.STRING
    },
    file_3: {
        type: DataTypes.STRING
    },
    file_4: {
        type: DataTypes.STRING
    },
} ,{
    tableName:'attachment'
  // Other model options go here
});

Sim.hasOne(Attachment, {
    foriegnKey:DataTypes.UUID
})
Attachment.belongsTo(Sim)

db.sync({alter:true})

module.exports = Attachment