// src/models/Favorite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Importar modelo de usuario
const Idea = require('./Idea'); // Importar modelo de idea

const Favorite = sequelize.define('Favorite', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    ideaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    tableName: 'favorites',
    timestamps: false,
});

// Relaciones con User y Idea
Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Idea, { foreignKey: 'ideaId' });

module.exports = Favorite;
