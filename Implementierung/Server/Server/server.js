var express = require('express');
var http = require('http');
var app = express();

var port = 1337;
//app.all('/', (req, res) => res.send("index"));

app.get('/', (req, res) => {
    var mysql = require('mysql');
    var database_config = require('./modules/config/database');

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "schnuppertage"
    });

    connection.connect();
    var id, name, beschreibung, kürzel;

    connection.query(`SELECT * from gegenstand;`, function (error, results, fields) {
        if (error) {
            console.log(error);
            throw error;
        }
        res.send(results);
    });

    connection.end();

    res.status(200).json({
        "id": id, "name": name, "kürzel": kürzel, beschreibung: beschreibung
    });
});
app.use('/api', require('./modules/api'));

server = http.createServer(app);

server.listen(port);