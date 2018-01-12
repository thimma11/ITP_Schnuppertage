var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('../../config/database');



router.use('/:id/events', require('./events'));

router.get('/', (req, res) => {
    var connection = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    connection.query(`SELECT d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d;`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/:id/locations', (req, res) => {
    var connection = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    let id = req.params.id;
    connection.query(`SELECT l.id, l.name from departments d
            JOIN locations_departments ld on(ld.departments_id=${id})
            JOIN locations l on(l.id=ld.locations_id);`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    var connection = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    let token = req.query.authToken;
    console.log(req.query);
    console.log(req.body);
    if (token != undefined && database_config.verify_request(token)) {
        connection.connect();
        connection.query(`INSERT INTO departments (departments.NAME, departments.CONTRACTION) VALUES ('${req.body.name}', '${req.body.contraction}');`, function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});

router.get('/:id', (req, res) => {
    var connection = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    let id = req.params.id;
    connection.query(`SELECT d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d WHERE d.ID = ${id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});
router.put('/:id', (req, res) => {
    var connection = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    let token = req.query.token;
    if (token != undefined && database_config.verify_request(token)) {
        let id = req.params.id;
        connection.query(`UPDATE d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d WHERE d.ID = ${id};`, function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});
router.delete('/:id', (req, res) => {
    var connection = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    let token = req.query.authToken;
    if (token != undefined && database_config.verify_request(token)) {
        connection.query(`DELETE from departments WHERE ID = ${req.params.id};`, function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});




module.exports = router;