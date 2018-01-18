﻿var express = require('express');
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
        connection.query(`INSERT INTO events (events.DATE, events.DEPARTMENTS_ID, events.LOCATIONS_ID) VALUES (${date}, ${id}, ${location_id});`, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});

router.get('/:id/locations', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT locations.ID, locations.NAME FROM locations JOIN locations_departments ON locations.ID = locations_departments.LOCATIONS_ID JOIN departments ON locations_departments.DEPARTMENTS_ID = departments.ID WHERE departments.ID = ?;`, [id],function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.post('/:id/locations', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {
        let id = req.params.id;
        connection.query(`INSERT INTO locations_departments (locations_departments.LOCATIONS_ID, locations_departments.DEPARTMENTS_ID) VALUES (?, ?);`, [req.body.location_id, id], function (error, results, fields) {
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
    connection.query(`SELECT d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d;`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/:id/locations', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT l.id, l.name from departments d
            JOIN locations_departments ld on(ld.departments_id=${id})
            JOIN locations l on(l.id=ld.locations_id);`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.post('/', (req, res) => {
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
    let id = req.params.id;
    connection.query(`SELECT d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d WHERE d.ID = ${id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});
router.put('/:id', (req, res) => {
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