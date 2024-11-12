const db = require('../config/db');

// Agregar una idea a favoritos
const addFavorite = (req, res) => {
    const { userId, ideaId } = req.body;


    // Verificar si la combinación ya existe
    const checkQuery = 'SELECT * FROM favorites WHERE userId = ? AND ideaId = ?';
    db.query(checkQuery, [userId, ideaId], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error al verificar favoritos:', checkErr);
            return res.status(500).json({ message: 'Error al verificar favoritos' });
        }

        if (checkResults.length > 0) {
            // Si ya existe, no insertar
            return res.status(400).json({ message: 'Esta idea ya está en tus favoritos' });
        }

        // Si no existe, insertar el nuevo favorito
        const insertQuery = 'INSERT INTO favorites (userId, ideaId) VALUES (?, ?)';
        db.query(insertQuery, [userId, ideaId], (err, results) => {
            if (err) {
                console.error('Error agregando a favoritos:', err);
                return res.status(500).json({ message: 'Error agregando a favoritos' });
            }
            res.status(201).json({ message: 'Idea agregada a favoritos' });
        });
    });
};

// Obtener todos los favoritos de un usuario
const getFavorites = (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT f.userId, f.ideaId, i.description, i.recommendedTechnologies, 
               i.designPatterns, i.additionalFeatures, i.knowledgeLevel, 
               i.generationDate, u.email 
        FROM favorites f
        INNER JOIN ideas i ON f.ideaId = i.ideaId
        INNER JOIN users u ON f.userId = u.userId
        WHERE f.userId = ?;
    `;
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error obteniendo favoritos:', err);
            return res.status(500).json({ message: 'Error obteniendo favoritos' });
        }
        res.json(results);
    });
};


// Eliminar una idea de favoritos
const removeFavorite = (req, res) => {
    const { userId, ideaId } = req.params;
    const query = 'DELETE FROM favorites WHERE userId = ? AND ideaId = ?';
    db.query(query, [userId, ideaId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error eliminando de favoritos' });
        }
        res.json({ message: 'Idea eliminada de favoritos exitosamente' });
    });
};

// Exportar los controladores
module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite,
};
