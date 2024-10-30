// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql-labo4.alwaysdata.net', // Solo especifica el host
    user: 'root',
    password: 'luvolta',
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
