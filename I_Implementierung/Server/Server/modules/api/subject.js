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
    connection.query(`SELECT s.ID, s.Name FROM subjects s;`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });

    /*
    connection.connect();
    var id, name, beschreibung, kürzel;

    connection.query(`SELECT gegenstand.ID AS ID, gegenstand.name AS NAME, gegenstand.beschreibung AS BESCHREIBUNG, gegenstand.kürzel AS KÜRZEL from gegenstand;`, function (error, results, fields) {
        if (error) {
            console.log(error);
            console.log(results);
            throw error;
        }
        if (results[0]) {
            id = results[0].ID;
            name = results[0].NAME;
            kürzel = results[0].KÜRZEL;
            if (results[0].BESCHREIBUNG)
                beschreibung = results[0].BESCHREIBUNG;
        }
        else {

        }
    });

    connection.end();

    res.status(200).json({
        "id": id, "name": name, "kürzel": kürzel, beschreibung: beschreibung
    });
    */
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO subjects(subjects.NAME) VALUES (?);`, [req.body.name], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`UPDATE subjects set name = ? WHERE id = ${id};`, [req.body.name], function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT s.ID, s.Name FROM subjects s WHERE s.ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM subjects WHERE subjects.ID = ${id}`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});




module.exports = router;