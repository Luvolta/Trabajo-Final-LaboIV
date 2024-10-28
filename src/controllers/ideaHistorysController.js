const db = require('../config/db');

// Crear un nuevo registro en el historial de ideas
const createIdeaHistory = (req, res) => {
    const { userId, ideaId, parameterId } = req.body;
    const query = 'INSERT INTO ideaHistory (userId, ideaId, parameterId) VALUES (?, ?, ?)';
    db.query(query, [userId, ideaId, parameterId], (err, results) => {
        if (err) {
            console.error('Error creando el historial de ideas:', err);
            return res.status(500).json({ message: 'Error creando el historial de ideas' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

// Obtener todo el historial de ideas de un usuario
const getIdeaHistory = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM ideaHistory WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error obteniendo el historial de ideas:', err);
            return res.status(500).json({ message: 'Error obteniendo el historial de ideas' });
        }
        res.json(results);
    });
};

// Exportar los controladores
module.exports = {
    createIdeaHistory,
    getIdeaHistory,
};
