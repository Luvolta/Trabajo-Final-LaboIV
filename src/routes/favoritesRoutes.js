const express = require('express');
const { addFavorite, getFavorites } = require('../controllers/favoritesController');
const router = express.Router();

router.post('/', addFavorite);
router.get('/', getFavorites);

module.exports = router;
