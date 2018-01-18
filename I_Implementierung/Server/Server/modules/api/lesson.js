﻿var express = require('express');
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
    connection.query(`SELECT lessons.ID, lessons.START, lessons.END, lessons.DAYTABLES_ID, lessons.SUBJECTS_ID, lessons.TEACHERS_ID FROM lessons;`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    let token = req.query.token;
    console.log(token);
    if (database_config.verify_request(token)) {
        connection.query(`INSERT INTO lessons (lessons.START, lessons.END, lessons.DAYTABLES_ID, lessons.SUBJECTS_ID, lessons.TEACHERS_ID) VALUES (${req.body.start}, ${req.body.end}, ${req.body.daytables_id}, ${req.body.subjects_id}, ${teacher_id});`, function (error, results, fields) {
            if (error) throw error;
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
    connection.query(`SELECT lessons.ID AS id, lessons.START AS start, lessons.END AS end, lessons.DAYTABLES_ID, lessons.SUBJECTS_ID, lessons.TEACHERS_ID FROM lessons WHERE lessons.ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.put('/:id', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {
        let id = req.params.id;
        res.send(id);
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
        connection.query(`DELETE FROM lessons WHERE lessons.ID = ${id};`, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});




module.exports = router;