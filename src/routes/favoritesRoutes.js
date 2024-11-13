const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');
const router = express.Router();

router.post('/', addFavorite);
router.get('/', getFavorites);
router.delete('/:userId/:ideaId', removeFavorite);

module.exports = router;
