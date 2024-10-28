// src/models/IdeaHistory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Importar modelo de usuario
const Idea = require('./Idea'); // Importar modelo de idea
const InputParameter = require('./InputParameter'); // Importar modelo de inputParameter

const IdeaHistory = sequelize.define('IdeaHistory', {
    historyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ideaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    parameterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'ideaHistory',
    timestamps: false,
});

// Relaciones con User, Idea y InputParameter
IdeaHistory.belongsTo(User, { foreignKey: 'userId' });
IdeaHistory.belongsTo(Idea, { foreignKey: 'ideaId' });
IdeaHistory.belongsTo(InputParameter, { foreignKey: 'parameterId' });

module.exports = IdeaHistory;
