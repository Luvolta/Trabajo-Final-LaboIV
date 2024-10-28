const express = require('express');
const router = express.Router();
const ideasController = require('../controllers/ideasController');

// Ruta para obtener una idea específica
router.get('/:id', ideasController.getIdeaById);

// // Ruta para eliminar una idea
// router.delete('/:id', ideasController.deleteIdea);

module.exports = router;
