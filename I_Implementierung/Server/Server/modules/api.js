var express = require('express');
var router = express.Router();
var gegenstand = require('./gegenstand');
var lehrer = require('./lehrer');
var fach = require('./fach');


router.use('./api/gegenstand', gegenstand);
router.use('./api/lehrer', lehrer);
router.use('./api/fach', fach);

router.get('/', (req, res) => {
    res.send("asd");
});



module.exports = router;




