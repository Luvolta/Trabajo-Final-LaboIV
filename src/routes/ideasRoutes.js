const express = require('express');
const router = express.Router();
const ideasController = require('../controllers/ideasController');

// Ruta para crear una idea
router.post('/', ideasController.createIdea);

// Ruta para obtener todas las ideas
router.get('/', ideasController.getAllIdeas);

// Ruta para obtener una idea específica
router.get('/:id', ideasController.getIdeaById);

// Ruta para actualizar una idea
router.put('/:id', ideasController.updateIdea);

// Ruta para eliminar una idea
router.delete('/:id', ideasController.deleteIdea);

module.exports = router;
