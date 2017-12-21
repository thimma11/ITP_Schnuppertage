var express = require('express');
var router = express.Router();
var gegenstand = require('./gegenstand');
var lehrer = require('./lehrer');
var fach = require('./fach');


router.use('/gegenstand', gegenstand);
router.use('/lehrer', lehrer);
router.use('/fach', fach);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;




