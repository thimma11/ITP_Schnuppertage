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

router.post('/:dep_id/:loc_id', (req, res) => {
    let dep_id = req.params.dep_id;
    let loc_id = req.params.loc_id;
    connection.query(`INSERT INTO timetables (timetables.DEPARTMENTS_ID, timetables.LOCATIONS_ID) VALUES (?, ?);`, [dep_id, loc_id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;