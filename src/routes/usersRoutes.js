const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/usersController');

// Rutas para los usuarios
router.post('/', createUser);
router.get('/', getUsers);

module.exports = router;
