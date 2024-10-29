// src/server.js
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Conexión a la base de datos
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv'); // Para cargar variables de entorno

dotenv.config(); // Cargar variables de entorno

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const ideasRoutes = require('./routes/ideasRoutes');
const inputParametersRoutes = require('./routes/inputParametersRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const ideaHistoryRoutes = require('./routes/ideaHistorysRoutes');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto según tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Idea Generator API',
            version: '1.0.0',
            description: 'API para generar ideas de proyectos',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./routes/*.js'], // Rutas donde Swagger buscará las definiciones
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/ideas', authMiddleware, ideasRoutes);
app.use('/api/input-parameters', authMiddleware, inputParametersRoutes);
app.use('/api/favorites', authMiddleware, favoritesRoutes);
app.use('/api/idea-history', authMiddleware, ideaHistoryRoutes);

// Conexión a la base de datos y arranque del servidor
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
});
