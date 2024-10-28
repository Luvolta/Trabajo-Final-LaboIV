// src/controllers/usersController.js
const db = require('../config/db');

// Crear un nuevo usuario
const createUser = (req, res) => {
    const { email, password } = req.body; // Eliminamos 'name'
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error creando el usuario:', err);
            return res.status(500).json({ message: 'Error creando el usuario' });
        }
        res.status(201).json({ id: results.insertId, email }); // Usamos solo el 'email'
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
