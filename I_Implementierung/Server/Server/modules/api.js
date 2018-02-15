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

    // set active bool for user
});

module.exports = router;