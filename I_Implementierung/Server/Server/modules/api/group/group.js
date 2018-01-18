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

router.get('/:id/daytables', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT daytables.ID, daytables.DAY_NAME FROM groups JOIN daytables ON groups.ID = daytables.GROUPS_ID WHERE groups.ID = ?;', [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});




module.exports = router;