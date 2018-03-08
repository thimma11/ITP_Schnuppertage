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
    connection.query('DELETE FROM participants WHERE participants.EVENTS_ID = ?', [req.params.id], function (error, results, fields) {
        if (error) console.log(error);
        connection.query(`DELETE from events WHERE ID = ${req.params.id};`, function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    });
    
});

router.post('/', (req, res) => {
    let date = req.body.date;
    let dep_id = req.body.departments_id;
    let loc_id =req.body.locations_id;
    let group_size = req.body.groupSize;
    connection.query(`INSERT INTO events(date, departments_id, locations_id, group_size) VALUES(?, ?, ?, ?)`, [date, dep_id, loc_id, group_size], function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/dates/:dep_id/:loc_id', (req, res) => {
    let dep = req.params.dep_id;
    let loc = req.params.loc_id;
    arr = []
    connection.query(`SELECT DATE_FORMAT(date,\'%d-%m-%Y\') as date from events where departments_id = ${dep} and locations_id = ${loc} and date >= NOW();`, function (error, results, fields) {
        if (error) throw error;
        for (let index = 0; index < results.length; index++) {
            arr.push(results[index]['date']);
        }
        res.json(arr);
    });
});

module.exports = router;