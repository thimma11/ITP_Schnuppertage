var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department');


router.use('/subjects', subject);
router.use('/teachers', teacher);
router.use('/lessons', lesson);
router.use('/departments', department);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;