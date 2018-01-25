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

});

router.post('/', (req, res) => {
    console.log(req.body);
    connection.query(`INSERT INTO participants (firstname, lastname, phone, email, school_location, school_typ, events_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.school_location, req.body.school_typ, req.body.events_id], function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/events/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT * from participants p WHERE p.events_id = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM participants WHERE id = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;