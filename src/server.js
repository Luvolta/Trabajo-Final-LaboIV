// src/server.js
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Conexión a la base de datos
const dotenv = require('dotenv'); // Para cargar variables de entorno
const swaggerUi = require('swagger-ui-express');

dotenv.config(); // Cargar variables de entorno

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const ideasRoutes = require('./routes/ideasRoutes');
const inputParametersRoutes = require('./routes/inputParametersRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const ideaHistoryRoutes = require('./routes/ideaHistorysRoutes');

const authMiddleware = require('./middleware/authMiddleware');
const { swaggerConfig } = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Cambia esto según tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use(express.json());

// Ruta para ver la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/ideas', authMiddleware, ideasRoutes);
app.use('/api/input-parameters', authMiddleware, inputParametersRoutes);
app.use('/api/favorites', authMiddleware, favoritesRoutes);
app.use('/api/idea-history', authMiddleware, ideaHistoryRoutes);

// Arranque del servidor
void (async function runMe() {
  db.connect(err => {
    if (err) {
      console.error('Error conectando a la base de datos:', err);
      return;
    }
    console.log('Conectado a la base de datos MySQL');
  });

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})();
