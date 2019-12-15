const mysql = require('mysql2');

export default () => {
    return mysql.createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PWD,
        database: process.env.SQL_TABLE,
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    }).promise();
};
