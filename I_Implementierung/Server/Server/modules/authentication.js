var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    if (req.body.username != undefined && req.body.password != undefined && req.body.username != "" && req.body.password != "") {
        const payload = {
            username: req.body.username
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
            success: true,
            token: token
        });
    }
});

module.exports = router;