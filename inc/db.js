const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'user', 
    database: 'saboroso',
    password: 'V1ct0rfut3b0l@',
    multipleStatements: true
});

module.exports = connection;