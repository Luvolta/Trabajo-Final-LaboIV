const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importa la conexión a la base de datos
const router = express.Router();

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave secreta más segura

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Hash de la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error creando el usuario' });
        }

        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (error) => {
            if (error) {
                return res.status(500).json({ message: 'Error creando el usuario' });
            }
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        });
    });
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = results[0];

        // Comparar la contraseña
        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }

            // Crear un token
            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Inicio de sesión exitoso', token });
        });
    });
});

module.exports = router;
