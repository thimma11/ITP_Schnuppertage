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

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE from events WHERE ID = ${req.params.id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/dates/:dep_id/:loc_id', (req, res) => {
    let dep = req.params.dep_id;
    let loc = req.params.loc_id;

    connection.query(`SELECT e.date from events e where e.departments_id = ${dep} and e.locations_id = ${loc};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


module.exports = router;