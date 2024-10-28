// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Solo especifica el host
    user: 'root',
    password: 'root',
    database: 'idea_generator'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
