const db = require('../config/db');
const bcrypt = require('bcrypt');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { email, password } = req.body;

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
            return res.status(409).json({ message: 'El usuario ya existe.' });
        }

        // Hashear la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertQuery, [email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error creando el usuario:', err);
                return res.status(500).json({ message: 'Error creando el usuario' });
            }
            res.status(201).json({ userId: results.insertId, email });
        });
    });
};

// Función para iniciar sesión
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Validar que se reciban todos los campos necesarios
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona email y contraseña.' });
    }

    // Buscar el usuario en la base de datos
    const userQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error buscando el usuario:', err);
            return res.status(500).json({ message: 'Error buscando el usuario' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Verificar la contraseña
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Iniciar sesión exitoso
        res.status(200).json({ userId: user.userId, email: user.email });
    });
};

// Exportar las funciones del controlador
module.exports = {
    registerUser,
    loginUser
};
