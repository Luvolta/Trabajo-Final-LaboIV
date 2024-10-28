// src/models/ideaModel.js
const db = require('../config/db');

const Idea = {
    create: (ideaData) => {
        const { description, recommendedTechnologies, designPatterns, additionalFeatures, difficultyLevel, projectType } = ideaData;
        
        const query = 'INSERT INTO ideas (description, recommended_technologies, design_patterns, additional_features, difficulty_level, project_type) VALUES (?, ?, ?, ?, ?, ?)';
        
        db.query(query, [description, JSON.stringify(recommendedTechnologies), JSON.stringify(designPatterns), JSON.stringify(additionalFeatures), difficultyLevel, projectType], (err, results) => {
            if (err) {
                console.error('Error al guardar la idea en la base de datos:', err);
                return;
            }
            console.log('Idea guardada con éxito:', results.insertId);
        });
    },

    getHistory: (userId) => {
        const query = 'SELECT * FROM ideas WHERE user_id = ? ORDER BY created_at DESC';
        
        return new Promise((resolve, reject) => {
            db.query(query, [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = Idea;
