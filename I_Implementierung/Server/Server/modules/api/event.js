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
    let token = req.query.token;
    if (token != undefined && database_config.verify_request(token)) {
        let id = req.params.id;
        connection.query(`DELETE from events WHERE ID = ${req.params.id};`, function (error, results, fields) {
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