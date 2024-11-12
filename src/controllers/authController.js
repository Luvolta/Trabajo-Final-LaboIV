const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    // Validar que se reciban todos los campos necesarios
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona email y contraseña.' });
    }

    try {
        // Verificar si el usuario ya existe
        const userQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await db.query(userQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe.' });
        }

        // Hashear la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const result = await db.query(insertQuery, [email, hashedPassword]);

        // Generar un token JWT
        const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.status(201).json({ userId: result.insertId, email, token });
    } catch (err) {
        console.error('Error creando el usuario:', err);
        res.status(500).json({ message: 'Error creando el usuario' });
    }
};

// Función para iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validar que se reciban todos los campos necesarios
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona email y contraseña.' });
    }

    try {
        // Buscar el usuario en la base de datos
        const userQuery = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(userQuery, [email]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Verificar la contraseña
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }


        // Iniciar sesión exitoso y generar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.status(200).json({ userId: user.id, email: user.email, token });
    } catch (err) {
        console.error('Error durante el inicio de sesión:', err);
        res.status(500).json({ message: 'Error durante el inicio de sesión' });
    }
};

// Exportar las funciones del controlador
module.exports = {
    registerUser,
    loginUser
};
