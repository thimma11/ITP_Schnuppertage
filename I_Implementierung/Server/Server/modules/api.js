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
var path = require('path');

var mysql = require('mysql');
var database_config = require('./config/database');
const { spawn } = require('child_process');
const { execFile } = require('child_process');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
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


router.get('/getpdf/:id', (req, res) => {
    user_id = req.params.id;
    console.log("start process");
    const ls = execFile('Schnupperschülerbestätigung.exe', [user_id]);
    
    const child = execFile('./Schnupperschülerbestätigung/Schnupperschülerbestätigung/bin/Debug/Schnupperschülerbestätigung.exe', [user_id], (error, stdout, stderr) => {
        console.log("finish processssssss2123");
        if (error) {
            throw error;
        }
        console.log(process.env.PATH);
        
        res.sendFile(__dirname + "/" + stdout);
    });
});

module.exports = router;