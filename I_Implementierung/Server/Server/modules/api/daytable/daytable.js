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

router.all('*', function (req, res, next) {
    var p = new Promise(function (resolve, reject) {
        try {
            connection.connect();
            resolve();
        } catch (e) {
            reject();
        }
    });
    p.then((value) => {
        next();
    }, (reason) => {
        res.setHeader(500);
        res.end("connection failed");
    });
});

router.get('/', (req, res) => {
    connection.query('SELECT');
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
});

router.get('/lessons/:day_name/:group_id', (req, res) => {
    let day_name = req.params.day_name;
    let group_id = req.params.group_id
    connection.query(`SELECT l.id, l.start, l.end, t.contraction, s.name from lessons l JOIN teachers t ON(l.teachers_id=t.id) JOIN subjects s ON(l.subjects_id=s.id) JOIN daytables d ON(l.daytables_id=d.id) JOIN groups g ON(d.groups_id=g.id) WHERE d.day_name = ? and g.id = ? ORDER BY l.start DESC;`, [day_name, group_id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/lessons/:day_name/:group_id', (req, res) => {
    let day_name = req.params.day_name;
    let group_id = req.params.group_id;

    let start = req.body.start;
    let end = req.body.end;
    let subject_id = req.body.subjects_id;
    let teacher_id = req.body.teachers_id;

    if (checkVariable(req.body.start) && checkVariable(req.body.end) && checkVariable(req.body.start) && checkVariable(req.body.start)) {
        connection.query(`SELECT d.id as id from daytables d WHERE d.day_name = ? and d.groups_id = ?`, [day_name, group_id], function (error, daytables, fields) {
            if (error) throw error;
            connection.query(`INSERT INTO lessons (start, end, subjects_id, teachers_id, daytables_id) VALUES(?, ?, ?, ?, ?)`, [start, end, subject_id, teacher_id, daytables[0]['id']], function (error, results, fields) {
                if (error) throw error;
                res.json(results);
            });
        });
    }
    else {
        res.json("error: ");
    }
});

function checkVariable(variable) {
    if (variable != undefined && variable != "")
        return true;
    else
        return false;
}

module.exports = router;