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




module.exports = router;