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
    return new Promise(resolve => {
        connection.query(`SELECT admin.token FROM admin WHERE admin.token = ${token} LIMIT 1`, (err, results, fields) => {
            if (err) throw err;
            console.log(results[0]);
            if (results[0].token) {
                console.log(true);
                resolve(true);
            }
            else {
                console.log(false);
                resolve(false);
            }
        });
    });
};