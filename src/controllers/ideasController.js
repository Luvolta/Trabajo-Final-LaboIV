const db = require('../config/db');

// Crear una nueva idea
exports.createIdea = (req, res) => {
    const {  description, userId } = req.body;
    const query = 'INSERT INTO ideas ( description, userId) VALUES (?, ?, ?)';
    db.query(query, [ description, userId], (error) => {
        if (error) {
            return res.status(500).json({ message: 'Error creando la idea' });
        }
        res.status(201).json({ message: 'Idea creada exitosamente' });
    });
};

// Obtener todas las ideas
exports.getAllIdeas = (req, res) => {
    const query = 'SELECT * FROM ideas';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error obteniendo las ideas' });
        }
        res.json(results);
    });
};

// Obtener una idea por ID
exports.getIdeaById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM ideas WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error || results.length === 0) {
            return res.status(404).json({ message: 'Idea no encontrada' });
        }
        res.json(results[0]);
    });
};

// Actualizar una idea
exports.updateIdea = (req, res) => {
    const { id } = req.params;
    const {  description } = req.body;
    const query = 'UPDATE ideas SET = ?, description = ? WHERE id = ?';
    db.query(query, [ description, id], (error) => {
        if (error) {
            return res.status(500).json({ message: 'Error actualizando la idea' });
        }
        res.json({ message: 'Idea actualizada exitosamente' });
    });
};

// Eliminar una idea
exports.deleteIdea = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ideas WHERE id = ?';
    db.query(query, [id], (error) => {
        if (error) {
            return res.status(500).json({ message: 'Error eliminando la idea' });
        }
        res.json({ message: 'Idea eliminada exitosamente' });
    });
};