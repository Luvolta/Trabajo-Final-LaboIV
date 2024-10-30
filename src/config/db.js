// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql-labo4.alwaysdata.net',
    user: 'luvolta',
    password: 'TrabajoLaboFinal',
    database: 'luvolta_labo4',
    connectTimeout: 10000 
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
