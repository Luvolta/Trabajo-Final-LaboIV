const db = require('../config/db');
const axios = require('axios');
require('dotenv').config(); // Carga las variables de entorno

// Crear un nuevo parámetro de entrada
const createInputParameter = async (req, res) => {
    const { theme, purpose, technologies, knowledgeLevel, preferredDesignPatterns, projectType } = req.body;

    console.log('Recibiendo solicitud para crear un nuevo parámetro de entrada:', req.body);

    // Inserta el parámetro en la base de datos
    const query = 'INSERT INTO inputParameters (theme, purpose, technologies, knowledgeLevel, preferredDesignPatterns, projectType) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [theme, purpose, technologies, knowledgeLevel, preferredDesignPatterns, projectType], async (err, results) => {
        if (err) {
            console.error('Error creando el parámetro de entrada:', err);
            return res.status(500).json({ message: 'Error creando el parámetro de entrada' });
        }

        console.log('Parámetro de entrada creado con éxito, ID:', results.insertId);

        // Generar una idea usando la API de Gemini
        try {
            const apiKey = process.env.API_KEY; // Concatenar o utilizar como variable
            console.log('Llamando a la API de Gemini con la siguiente configuración:', {
                theme,
                purpose,
                technologies,
                apiKey: '*****' // Ocultando la clave API en los logs por seguridad
            });

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Genera una idea de proyecto sobre ${theme} enfocado en ${purpose}, usando ${technologies}.`
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('Respuesta de la API de Gemini recibida:', response.data);

            // Procesar la respuesta y enviarla al cliente
            const ideaContent = response.data; // Aquí procesas la idea generada según sea necesario
            res.status(201).json({ id: results.insertId, ideaContent });
        } catch (apiError) {
            console.error('Error al llamar a la API de Gemini:', apiError);
            return res.status(500).json({ message: 'Error generando la idea' });
        }
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
        console.log('Parámetros de entrada obtenidos:', results);
        res.json(results);
    });
};

// Obtener un parámetro de entrada por ID
const getInputParameterById = (req, res) => {
    const { parameterId } = req.params;
    console.log('Recibiendo solicitud para obtener parámetro de entrada con ID:', parameterId);
    const query = 'SELECT * FROM inputParameters WHERE parameterId = ?';
    db.query(query, [parameterId], (err, results) => {
        if (err || results.length === 0) {
            console.error('Parámetro de entrada no encontrado para ID:', parameterId);
            return res.status(404).json({ message: 'Parámetro de entrada no encontrado' });
        }
        console.log('Parámetro de entrada encontrado:', results[0]);
        res.json(results[0]);
    });
};

// Actualizar un parámetro de entrada
const updateInputParameter = (req, res) => {
    const { parameterId } = req.params;
    const { theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId } = req.body;
    console.log('Recibiendo solicitud para actualizar parámetro de entrada con ID:', parameterId);
    const query = 'UPDATE inputParameters SET theme = ?, technologies = ?, knowledgeLevel = ?, preferredDesignPatterns = ?, description = ?, userId = ?, ideaId = ? WHERE parameterId = ?';
    db.query(query, [theme, technologies, knowledgeLevel, preferredDesignPatterns, description, userId, ideaId, parameterId], (err, results) => {
        if (err) {
            console.error('Error actualizando el parámetro de entrada:', err);
            return res.status(500).json({ message: 'Error actualizando el parámetro de entrada' });
        }
        console.log('Parámetro de entrada actualizado exitosamente con ID:', parameterId);
        res.json({ message: 'Parámetro de entrada actualizado exitosamente' });
    });
};

// Eliminar un parámetro de entrada
const deleteInputParameter = (req, res) => {
    const { parameterId } = req.params;
    console.log('Recibiendo solicitud para eliminar parámetro de entrada con ID:', parameterId);
    const query = 'DELETE FROM inputParameters WHERE parameterId = ?';
    db.query(query, [parameterId], (err, results) => {
        if (err) {
            console.error('Error eliminando el parámetro de entrada:', err);
            return res.status(500).json({ message: 'Error eliminando el parámetro de entrada' });
        }
        console.log('Parámetro de entrada eliminado exitosamente con ID:', parameterId);
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
