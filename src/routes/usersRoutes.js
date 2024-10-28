const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/usersController');

// Rutas para los usuarios
router.post('/users', createUser);
router.get('/users', getUsers);

module.exports = router;
