const db = require('../config/db');

// Crear un nuevo parámetro de entrada
const createInputParameter = (req, res) => {
    const { theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId } = req.body;
    const query = 'INSERT INTO inputParameters (theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId], (err, results) => {
        if (err) {
            console.error('Error creando el parámetro de entrada:', err);
            return res.status(500).json({ message: 'Error creando el parámetro de entrada' });
        }
        res.status(201).json({ id: results.insertId, theme });
    });
};

// Obtener todos los parámetros de entrada
const getInputParameters = (req, res) => {
    const query = 'SELECT * FROM inputParameters';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo parámetros de entrada:', err);
            return res.status(500).json({ message: 'Error obteniendo parámetros de entrada' });
        }
        res.json(results);
    });
};

// Obtener un parámetro de entrada por ID
const getInputParameterById = (req, res) => {
    const { parameterId } = req.params;
    const query = 'SELECT * FROM inputParameters WHERE parameterId = ?';
    db.query(query, [parameterId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Parámetro de entrada no encontrado' });
        }
        res.json(results[0]);
    });
};

// Actualizar un parámetro de entrada
const updateInputParameter = (req, res) => {
    const { parameterId } = req.params;
    const { theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId } = req.body;
    const query = 'UPDATE inputParameters SET theme = ?, technologies = ?, knowledgeLevel = ?, preferredDesignPatterns = ?, description = ?, userId = ?, ideaId = ? WHERE parameterId = ?';
    db.query(query, [theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId, parameterId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error actualizando el parámetro de entrada' });
        }
        res.json({ message: 'Parámetro de entrada actualizado exitosamente' });
    });
};

// Eliminar un parámetro de entrada
const deleteInputParameter = (req, res) => {
    const { parameterId } = req.params;
    const query = 'DELETE FROM inputParameters WHERE parameterId = ?';
    db.query(query, [parameterId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error eliminando el parámetro de entrada' });
        }
        res.json({ message: 'Parámetro de entrada eliminado exitosamente' });
    });
};

// Exportar los controladores
module.exports = {
    createInputParameter,
    getInputParameters,
    getInputParameterById,
    updateInputParameter,
    deleteInputParameter,
};
