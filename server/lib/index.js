const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1:3306',
    user: 'seungjaelee 1',
    password: 'rlawldus1682,',
    database: 'my_db',
});

// connection.connect();

// connection.end();

module.exports = connection;