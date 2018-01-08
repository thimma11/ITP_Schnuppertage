var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('./config/database');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});


router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {

    }
    else {
        res.sendStatus(401);
        res.end();
    }
});

router.get('/:id?', (req, res) => {
    let id = req.params.id;
});
router.put('/:id', (req, res) => {
    let token = req.query.token;
    if (database_config.verify_request(token)) {
        let id = req.params.id;
        res.send("asd");
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