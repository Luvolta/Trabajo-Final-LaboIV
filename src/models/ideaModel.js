// src/models/Idea.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Importar modelo de usuario

const Idea = sequelize.define('Idea', {
    ideaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recommendedTechnologies: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    designPatterns: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    additionalFeatures: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    knowledgeLevel: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    generationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'ideas',
    timestamps: false,
});

// Relación con User
Idea.belongsTo(User, { foreignKey: 'userId' });

module.exports = Idea;
