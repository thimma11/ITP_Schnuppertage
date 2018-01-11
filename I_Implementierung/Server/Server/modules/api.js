var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department');


router.use('/subject', subject);
router.use('/teacher', teacher);
router.use('/lesson', lesson);
router.use('/department', department);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;