const express = require('express');
const router = express.Router();
const { generateAndLogIdea } = require('../controllers/inputParametersController');

// Define la ruta para manejar la solicitud POST
router.post('/', generateAndLogIdea); 

module.exports = router;
