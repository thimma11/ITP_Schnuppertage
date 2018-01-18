var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department/department');
var participant = require('./api/participant');
<<<<<<< HEAD
=======
var location = require('./api/location/location');
var event = require('./api/event');
>>>>>>> b42d99cd8201a7ae2480fbd9f9fe6c2d8d47cf07


router.use('/subjects', subject);
router.use('/teachers', teacher);
router.use('/lessons', lesson);
router.use('/departments', department);
router.use('/participants', participant);
<<<<<<< HEAD
=======
router.use('/locations', location);
router.use('/events', event);
>>>>>>> b42d99cd8201a7ae2480fbd9f9fe6c2d8d47cf07

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;