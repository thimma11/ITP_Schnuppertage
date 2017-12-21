var mysql = require('mysql');
var username = "root";
var password = "";
var host = "localhost";
var database = "schnuppertage";

var connection = mysql.createConnection({
    host: host,
    username: username,
    password: password,
    database: database
});

module.exports.username = username;
module.exports.password = password;
module.exports.host = host;
module.exports.database = database;


module.exports.verify_request = function (token) {
    connection.connect();

    connection.query(`SELECT administrator.token AS token from administrator where administrator.token = '${token}';`, function (error, results, fields) {
        if (error) throw error;
        if (token == results[0].token)
            return true;
    });
    return false;
}