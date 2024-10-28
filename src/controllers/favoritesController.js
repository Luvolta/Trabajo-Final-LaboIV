const db = require('../config/db');

// Agregar una idea a favoritos
const addFavorite = (req, res) => {
    const { userId, ideaId } = req.body;
    const query = 'INSERT INTO favorites (userId, ideaId) VALUES (?, ?)';
    db.query(query, [userId, ideaId], (err, results) => {
        if (err) {
            console.error('Error agregando a favoritos:', err);
            return res.status(500).json({ message: 'Error agregando a favoritos' });
        }
        res.status(201).json({ message: 'Idea agregada a favoritos' });
    });
};

// Obtener todos los favoritos de un usuario
const getFavorites = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM favorites WHERE userId = ?';
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
