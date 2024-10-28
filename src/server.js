// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación
const usersRoutes = require('./routes/usersRoutes'); // Importar rutas de usuarios
const ideasRoutes = require('./routes/ideasRoutes'); // Importar rutas de ideas
const inputsParametersRoutes = require('./routes/inputParametersRoutes'); // Importar rutas de parámetros de entrada
const favoritesRoutes = require('./routes/favoritesRoutes'); // Importar rutas de favoritos
const ideaHistorysRoutes = require('./routes/ideaHistorysRoutes'); // Importar rutas de historial de ideas
const db = require('./config/db'); // Conexión a la base de datos
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Idea Generator API',
            version: '1.0.0',
            description: 'API para generar ideas de proyectos',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Rutas donde Swagger buscará las definiciones
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usar las rutas de autenticación
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/input-parameters', inputParameterRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/idea-history', ideaHistoryRoutes);

// Sincronizar la base de datos y manejar posibles errores
db.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
        // Iniciar el servidor solo si la sincronización fue exitosa
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error sincronizando la base de datos:', error);
    });
