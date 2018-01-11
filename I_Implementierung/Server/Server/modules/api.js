var express = require('express');
var router = express.Router();
var subject = require('./api/subject');
var teacher = require('./api/teacher');
var lesson = require('./api/lesson');
var department = require('./api/department');


router.use('/subject', gegenstand);
router.use('/teacher', lehrer);
router.use('/lesson', fach);
router.use('/department', abteilung);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;