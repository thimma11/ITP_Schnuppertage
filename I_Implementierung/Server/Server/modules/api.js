var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department/department');
var location = require('./api/location/location');
var participant = require('./api/participant');
var event = require('./api/event');
var group = require('./api/group/group');
var timetable = require('./api/timetable');
var daytable = require('./api/daytable/daytable');

var jwt = require('jsonwebtoken');
var secret = 'itpistcool';

var mysql = require('mysql');
var database_config = require('./config/database');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});

router.post('/authenticate', (req, res) => {
    console.log("POST");
    if (req.body.username != undefined && req.body.password != undefined && req.body.username != "" && req.body.password != "") {
        let mysql = require('mysql');
        let database_config = require('./modules/config/database');

        let connection = mysql.createConnection({
            host: database_config.host,
            user: database_config.username,
            password: database_config.password,
            database: database_config.database
        });

        connection.query('SELECT * FROM admin WHERE admin.USERNAME = ? AND admin.PASSWORD = ?', [req.body.username, req.body.password], function (error, results, fields) {
            if (error) throw error;
            if (results) {
                const payload = {
                    username: req.body.username
                };
                var token = jwt.sign(payload, secret, {
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            }
        });
    }
    else {
        res.status(200).send({
            success: false,
            message: 'No token provided.'
        });
    }

});

router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.authToken || req.query.authToken || req.headers['Authentication'];

    let not_admin_methods = ["GET", "POST", "PUT", "DELETE"];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        if (not_admin_methods.find((element) => {
            if (req.method.toUpperCase() == element.toUpperCase())
                return 1;
            else
                return 0;
        })) {
            next();
        }
        else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }

    }
});

router.use('/subjects', subject);
router.use('/teachers', teacher);
router.use('/lessons', lesson);
router.use('/departments', department);
router.use('/participants', participant);
router.use('/events', event);
router.use('/locations', location);
router.use('/groups', group);
router.use('/timetables', timetable);
router.use('/daytables', daytable);

router.get('/', (req, res) => {
    res.send("asd");
});

router.get('/confirm_registration/:id', (req, res) => {
    user_id = req.params.id;

    connection.query(`UPDATE participants set is_confirmed=true WHERE id = ${user_id};`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send("Ihre Teilnahme wurde bestätigt!");
        }
    });
});

module.exports = router;