// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación

const app = express();
const PORT = 3001; // O el puerto que prefieras

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Usar las rutas de autenticación
app.use('/api', authRoutes); // Agregar el prefijo /api para las rutas de autenticación

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
