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
const getIdeaHistories = (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT 
            ideaHistory.*, 
            users.email AS userEmail, 
            users.userId AS userId,
            ideas.ideaId AS ideaId,
            ideas.description AS ideaDescription, 
            ideas.recommendedTechnologies AS ideaRecommendedTechnologies, 
            ideas.designPatterns AS ideaDesignPatterns, 
            ideas.additionalFeatures AS ideaAdditionalFeatures, 
            ideas.knowledgeLevel AS ideaKnowledgeLevel,
            ideas.generationDate AS ideaGenerationDate,
            inputParameters.parameterId AS parameterId,
            inputParameters.theme AS parameterTheme, 
            inputParameters.technologies AS parameterTechnologies,
            inputParameters.knowledgeLevel AS parameterKnowledgeLevel, 
            inputParameters.preferredDesignPatterns AS parameterPreferredDesignPatterns, 
            inputParameters.description AS parameterDescription
        FROM ideaHistory
        LEFT JOIN users ON ideaHistory.userId = users.userId
        LEFT JOIN ideas ON ideaHistory.ideaId = ideas.ideaId
        LEFT JOIN inputParameters ON ideaHistory.parameterId = inputParameters.parameterId
        WHERE ideaHistory.userId = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error obteniendo el historial de ideas:', err);
            return res.status(500).json({ message: 'Error obteniendo el historial de ideas' });
        }
        res.json(results);
    });
};

const getIdeaById = (req, res) => {
    // Extraer el ideaId desde los parámetros de la URL
    const { ideaId } = req.params;
    

    // Consulta SQL para obtener el historial de la idea con el ideaId proporcionado
    const query = `
        SELECT 
            ideaHistory.*,
            users.email AS userEmail,
            users.userId AS userId,
            ideas.ideaId AS ideaId,
            ideas.description AS ideaDescription,
            ideas.recommendedTechnologies AS ideaRecommendedTechnologies,
            ideas.designPatterns AS ideaDesignPatterns,
            ideas.additionalFeatures AS ideaAdditionalFeatures, 
            ideas.knowledgeLevel AS ideaKnowledgeLevel,
            ideas.generationDate AS ideaGenerationDate,
            inputParameters.parameterId AS parameterId,
            inputParameters.theme AS parameterTheme, 
            inputParameters.technologies AS parameterTechnologies,
            inputParameters.knowledgeLevel AS parameterKnowledgeLevel, 
            inputParameters.preferredDesignPatterns AS parameterPreferredDesignPatterns, 
            inputParameters.description AS parameterDescription
        FROM ideaHistory
        LEFT JOIN users ON ideaHistory.userId = users.userId
        LEFT JOIN ideas ON ideaHistory.ideaId = ideas.ideaId
        LEFT JOIN inputParameters ON ideaHistory.parameterId = inputParameters.parameterId
        WHERE ideaHistory.ideaId = ?
    `;

    // Ejecutar la consulta con el ideaId extraído de los parámetros
    db.query(query, [ideaId], (err, results) => {
        if (err) {
            console.error('Error obteniendo el historial de ideas:', err);
            return res.status(500).json({ message: 'Error obteniendo el historial de ideas' });
        }
        // Si no se encuentra el registro
        if (results.length === 0) {
            return res.status(404).json({ message: 'Idea no encontrada' });
        }
        // Responder con los resultados obtenidos
        res.json(results);
    });
};

// Exportar los controladores
module.exports = {
    createIdeaHistory,
    getIdeaHistories,
    getIdeaById,
};
