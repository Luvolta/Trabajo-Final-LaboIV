const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rutas relacionadas con los usuarios
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     security: []
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: tomas@gmail.com
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: tomate123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del nuevo usuario
 *                 email:
 *                   type: string
 *                   description: El correo electrónico del usuario
 *       400:
 *         description: Datos incorrectos o faltantes
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', usersController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     security: []
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/', usersController.getUsers);

module.exports = router;
