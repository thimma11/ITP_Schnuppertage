var express = require('express');
var router = express.Router();
var gegenstand = require('./api/gegenstand');
var lehrer = require('./api/lehrer');
var fach = require('./api/fach');
var abteilung = require('./api/abteilung');


router.use('/gegenstand', gegenstand);
router.use('/lehrer', lehrer);
router.use('/fach', fach);
router.use('/abteilung', abteilung);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;