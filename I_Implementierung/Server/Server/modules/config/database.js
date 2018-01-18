var mysql = require('mysql');
var username = "root";
var password = "";
var host = "localhost";
var database = "schnuppertage";

var connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database
});
module.exports.username = username;
module.exports.password = password;
module.exports.host = host;
module.exports.database = database;


module.exports.verify_request = function (token) {
    return true;
};