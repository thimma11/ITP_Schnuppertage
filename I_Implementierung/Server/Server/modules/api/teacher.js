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
    connection.query(`SELECT teachers.ID, teachers.CONTRACTION, teachers.NAME, teachers.SURNAME from teachers;`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO teachers(teachers.CONTRACTION, teachers.NAME, teachers.SURNAME) VALUES (?, ?, ?);`, [req.body.contraction, req.body.name, req.body.surname], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`UPDATE teachers set contraction = ?, name = ?, surname = ? WHERE id = ${id};`, [req.body.contraction, req.body.name, req.body.surname], function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT teachers.ID, teachers.CONTRACTION, teachers.NAME, teachers.SURNAME from teachers WHERE teachers.ID = ${id};`, function (error, results, fields) {
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