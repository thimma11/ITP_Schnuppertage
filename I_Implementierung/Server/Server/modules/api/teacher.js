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

router.all('*', function (req, res, next) {
    var p = new Promise(function (resolve, reject) {
        try {
            connection.connect();
            resolve();
        } catch (e) {
            reject();
        }
    });
    p.then((value) => {
        next();
    }, (reason) => {
        res.setHeader(500);
        res.end("connection failed");
    });
});

router.get('/', (req, res) => {
    connection.query(`SELECT teachers.ID, teachers.CONTRACTION from teachers;`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO teachers(teachers.CONTRACTION) VALUES (?);`, [req.body.contraction], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`UPDATE teachers set contraction = ? WHERE id = ${id};`, [req.body.contraction], function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT teachers.ID AS id, teachers.contraction from teachers WHERE teachers.ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM teachers WHERE teachers.ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});




module.exports = router;