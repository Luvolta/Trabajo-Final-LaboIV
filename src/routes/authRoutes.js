const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); 
const router = express.Router();

const SECRET_KEY = 'tu_clave_secreta';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     security: []
 *     summary: Inicia sesión un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El email del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *       '401':
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    console.log('Datos de inicio de sesión:', { email, password });
  
    // Consulta para buscar el usuario con el email proporcionado
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error || results.length === 0) {
        console.error('Error de credenciales:', error || 'No se encontró el usuario');
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      const user = results[0];
  
      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      bcrypt.compare(password, user.password, (err, match) => {
        if (err || !match) {
          console.error('Error en la comparación de contraseña:', err);
          return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
  
        // Si las credenciales son correctas, se crea un token JWT
        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
  
        // Responder con el token y la información del usuario
        res.json({
          message: 'Inicio de sesión exitoso',
          token,
          user: {
            userId: user.userId,
            email: user.email
          }
        });
      });
    });
  });
  
  module.exports = router;