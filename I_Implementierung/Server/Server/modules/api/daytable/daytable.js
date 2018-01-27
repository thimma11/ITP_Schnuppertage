var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('./database');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});


router.get('/', (req, res) => {
    connection.query('SELECT '
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
});

router.get('/:id/lessons', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT lessons.ID, lessons.START, lessons.END FROM lessons JOIN daytables ON lessons.DAYTABLES_ID = daytables.ID WHERE daytables.ID = ? ORDER BY lessons.START DESC;`, [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.post('/:id/lessons', (req, res) => {
    let id = req.params.id;
    if (checkVariable(req.body.start) && checkVariable(req.body.end) && checkVariable(req.body.start) && checkVariable(req.body.start)) {
        connection.query(``, [req.body.contraction], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
    else {

    }
});

function checkVariable(variable) {
    if (variable != undefined && variable != "")
        return true;
    else
        return false;
}

module.exports = router;