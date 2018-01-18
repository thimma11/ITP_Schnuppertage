var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department/department');
var participant = require('./api/participant');
var location = require('./api/location/location');
var event = require('./api/event');


router.use('/subjects', subject);
router.use('/teachers', teacher);
router.use('/lessons', lesson);
router.use('/departments', department);
router.use('/participants', participant);
router.use('/locations', location);
router.use('/events', event);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;