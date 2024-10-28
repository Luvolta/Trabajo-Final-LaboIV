// src/models/InputParameter.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Importar modelo de usuario
const Idea = require('./Idea'); // Importar modelo de idea

const InputParameter = sequelize.define('InputParameter', {
    parameterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    theme: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    technologies: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    knowledgeLevel: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    preferredDesignPatterns: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'inputParameters',
    timestamps: false,
});

// Relaciones con User y Idea
InputParameter.belongsTo(User, { foreignKey: 'userId' });
InputParameter.belongsTo(Idea, { foreignKey: 'ideaId' });

module.exports = InputParameter;
