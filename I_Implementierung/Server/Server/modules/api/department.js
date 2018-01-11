var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('../config/database');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});


router.get('/', (req, res) => {
    connection.query(`SELECT a.ID AS id, a.Bezeichnung AS name, a.Kürzel AS contraction from abteilung a;`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    let token = req.query.authToken;
    if (database_config.verify_request(token, connection)) {
        console.log("asd");
        connection.connect();
        connection.query(`INSERT INTO abteilung(abteilung.Bezeichnung, abteilung.Kürzel) VALUES (${req.body.name}, ${req.body.contraction});`, function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
        connection.end();
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT a.ID AS id, a.Bezeichnung AS name, a.Kürzel AS contraction from abteilung a WHERE a.ID = ${id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});
router.put('/:id', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {
        let id = req.params.id;
        res.send();
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});
router.delete('/:id', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {
        let id = req.params.id;
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});




module.exports = router;