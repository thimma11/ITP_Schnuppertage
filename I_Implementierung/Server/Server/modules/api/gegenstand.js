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
    connection.query(`SELECT gegenstand.ID, gegenstand.Name, gegenstand.Kürzel, gegenstand.Beschreibung FROM gegenstand;`, function (error, results, fields) {
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
    let token = req.query.token;
    console.log(token);
    if (database_config.verify_request(token)) {

    }
    else {
        res.sendStatus(401);
        res.end();
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    res.send("asd");
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
    }
    else {
        res.sendStatus(401);
        res.end();
    }
});




module.exports = router;