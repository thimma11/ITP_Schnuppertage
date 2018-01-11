var mysql = require('mysql');
var username = "root";
var password = "";
var host = "localhost";
var database = "schnuppertage";


module.exports.username = username;
module.exports.password = password;
module.exports.host = host;
module.exports.database = database;


module.exports.verify_request = function (token, connection) {
    let bool = false;
    await connection.query(`SELECT administrator.token AS token from administrator where administrator.token = ${token};`, function (error, results, fields) {
        if (error) throw error;
        if (results[0].token != undefined) {
            bool = true;
        }
        else
            return false;
    });

    return bool;
}