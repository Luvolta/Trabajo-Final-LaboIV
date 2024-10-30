// src/controllers/usersController.js
const db = require('../config/db');
const bcrypt = require('bcrypt'); // Importamos bcrypt

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { email, password } = req.body; // Obtenemos el email y la contraseña

    // Validar que se reciban todos los campos necesarios
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona email y contraseña.' });
    }

    // Verificar si el usuario ya existe
    const userQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error verificando el usuario:', err);
            return res.status(500).json({ message: 'Error verificando el usuario' });
        }
        
        if (results.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe.' }); // Usuario ya existente
        }

        try {
            // Hashear la contraseña antes de almacenarla
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario en la base de datos
            const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            db.query(insertQuery, [email, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Error creando el usuario:', err);
                    return res.status(500).json({ message: 'Error creando el usuario' });
                }
                res.status(201).json({ id: results.insertId, email }); // Devolvemos el ID y el email
            });
        } catch (error) {
            console.error('Error al hashear la contraseña:', error);
            return res.status(500).json({ message: 'Error al crear el usuario.' });
        }
    });
};

// Obtener todos los usuarios
const getUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo usuarios:', err);
            return res.status(500).json({ message: 'Error obteniendo usuarios' });
        }
        res.json(results);
    });
};

// Exportar los controladores
module.exports = {
    createUser,
    getUsers,
};
