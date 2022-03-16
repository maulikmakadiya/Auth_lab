var mysql = require('mysql');

const connection = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practical',
    multipleStatements: true,
    // whichdb:"LOCAL"
}
const conn_config = mysql.createConnection(connection)

module.exports = {
    config: connection,
    conn:conn_config,
    connection: conn_config.connect(function (err) {
        try {
            if (err) throw err;
            console.log("Database is connected successfully...")
        } catch (e) {
            console.log(e)
        }
    })
}