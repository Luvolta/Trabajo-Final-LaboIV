const db = require('../config/db');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const generateAndLogIdea = async (req, res) => {
    const { theme, technologies, knowledgeLevel, preferredDesignPatterns, description, purpose, userId } = req.body;

    console.log('Receiving request to create a new input parameter:', req.body);

    // Validación básica
    if (!theme || !technologies || !knowledgeLevel || !preferredDesignPatterns || !description || !purpose || !userId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validación de tipo y longitud
    if (typeof theme !== 'string' || theme.length < 3) {
        return res.status(400).json({ message: 'Theme must be a string with at least 3 characters.' });
    }
    if (typeof technologies !== 'string' || technologies.length < 3) {
        return res.status(400).json({ message: 'Technologies must be a string with at least 3 characters.' });
    }
    if (typeof knowledgeLevel !== 'string' || knowledgeLevel.length < 3) {
        return res.status(400).json({ message: 'Knowledge level must be a string with at least 3 characters.' });
    }
    if (typeof preferredDesignPatterns !== 'string' || preferredDesignPatterns.length < 3) {
        return res.status(400).json({ message: 'Preferred design patterns must be a string with at least 3 characters.' });
    }
    if (typeof description !== 'string' || description.length < 10) {
        return res.status(400).json({ message: 'Description must be a string with at least 10 characters.' });
    }
    if (typeof purpose !== 'string' || purpose.length < 3) {
        return res.status(400).json({ message: 'Purpose must be a string with at least 3 characters.' });
    }

    // Insertar parámetro de entrada en la base de datos
    const query = 'INSERT INTO inputParameters (theme, technologies, knowledgeLevel, preferredDesignPatterns, description, purpose, userId) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [theme, technologies, knowledgeLevel, preferredDesignPatterns, description, purpose, userId], async (err, results) => {
        if (err) {
            console.error('Error creating the input parameter:', err);
            return res.status(500).json({ message: 'Error creating the input parameter.' });
        }

        console.log('Input parameter created successfully, ID:', results.insertId);

        // Generar una idea utilizando Google Generative AI
        const formattedPrompt = `Generate a project idea about ${theme} focusing on ${purpose}, using ${technologies}. The response should follow the format: NameIdea-description-recommendedTechnologies-designPatterns-additionalFeatures-knowledgeLevel-todayDate.`;
        
        try {
            const ideaContent = await generateIdeaFromAPI(formattedPrompt);

            // Separar el contenido generado en componentes
            const [nameIdea, generatedDescription, recommendedTechnologies, designPatterns, additionalFeatures, knowledgeLevelResponse, todayDate] = ideaContent.split('-');

            // Guardar idea en la tabla de ideas
            const saveIdeaQuery = `
                INSERT INTO ideas (description, recommendedTechnologies, designPatterns, additionalFeatures, knowledgeLevel, generationDate, userId)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            
            const ideaData = [
                generatedDescription,
                recommendedTechnologies,
                designPatterns,
                additionalFeatures,
                knowledgeLevelResponse,
                new Date(), // Genera la fecha y hora actual
                userId // ID del usuario que se asume ya existe
            ];

            db.query(saveIdeaQuery, ideaData, (err) => {
                if (err) {
                    console.error('Error saving the idea:', err);
                    return res.status(500).json({ message: 'Error saving the generated idea.' });
                }

                res.status(201).json({ message: 'Idea saved successfully!', nameIdea });
            });
        } catch (apiError) {
            console.error('Error calling the Google Generative AI:', apiError);
            return res.status(500).json({ message: 'Error generating the idea.' });
        }
    });
};

// Función para llamar a Google Generative AI
const generateIdeaFromAPI = async (formattedPrompt) => {
    const apiKey = process.env.API_KEY;

    // Verificar si la clave de API está configurada
    if (!apiKey || typeof apiKey !== 'string') {
        throw new Error('API Key is missing or invalid.');
    }

    // Crear instancia del modelo generativo
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        // Generar contenido utilizando el modelo
        const result = await model.generateContent(formattedPrompt);
        
        // Verifica si la respuesta tiene el formato correcto
        if (result && result.response && typeof result.response.text === 'function') {
            const generatedText = result.response.text();
            console.log('Response from the Gemini API received:', generatedText);
            return generatedText; // Retorna el texto generado
        } else {
            throw new Error('Unexpected response format from the Gemini API');
        }
    } catch (error) {
        console.error('Error calling the Google Generative AI:', error);
        throw error; // Permitir que el error sea manejado en la función de llamada
    }
};

module.exports = {
    generateAndLogIdea,
};
