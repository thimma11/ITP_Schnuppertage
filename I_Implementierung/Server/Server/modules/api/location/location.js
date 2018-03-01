var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('../../config/database');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});

router.get('/:id/events', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT events.ID, events.DATE, locations.NAME FROM events JOIN locations ON locations.ID = events.LOCATIONS_ID WHERE events.DEPARTMENTS_ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.post('/:id/events', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {
        let id = req.params.id;
        connection.query('INSERT INTO events (events.DATE, events.DEPARTMENTS_ID, events.LOCATIONS_ID) VALUES ', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});

router.get('/', (req, res) => {
    connection.query(`SELECT locations.ID, locations.NAME FROM locations;`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO locations(locations.NAME) VALUES (?);`, [req.body.name],function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT locations.ID, locations.NAME FROM locations WHERE locations.ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});



module.exports = router;