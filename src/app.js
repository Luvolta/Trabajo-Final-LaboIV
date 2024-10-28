const express = require('express');
const cors = require('cors');
const ideaRoutes = require('./routes/ideasRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ideas', ideaRoutes); // Monta las rutas de ideas

module.exports = app;
