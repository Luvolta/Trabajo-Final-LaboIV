const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importa la conexión a la base de datos
const router = express.Router();

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave secreta más segura

    // Ruta para iniciar sesión
// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Datos de inicio de sesión:', { email, password }); // Log de las credenciales

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error || results.length === 0) {
            console.error('Error de credenciales:', error || 'No se encontró el usuario');
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = results[0];

        // Comparar la contraseña
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                console.error('Error en la comparación de contraseña:', err);
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }

            // Crear un token
            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });

            // Enviar la respuesta con el token y la información del usuario
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
