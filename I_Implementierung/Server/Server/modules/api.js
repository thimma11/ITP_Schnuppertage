var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department/department');
<<<<<<< HEAD
var participant = require('./api/participant');
=======
var location = require('./api/location/location');
>>>>>>> 867c9060e495a2ccb150d0cce40d9b19e93b54e6


router.use('/subjects', subject);
router.use('/teachers', teacher);
router.use('/lessons', lesson);
router.use('/departments', department);
<<<<<<< HEAD
router.use('/participants', participant);
=======
router.use('/locations', location);
>>>>>>> 867c9060e495a2ccb150d0cce40d9b19e93b54e6

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;