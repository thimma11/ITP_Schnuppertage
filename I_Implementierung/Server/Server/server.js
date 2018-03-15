'use strict';
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

app.set('secret', 'itpistcool');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    console.log("OPTIONS tada");
    // Pass to next layer of middleware
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var port = process.env.PORT || 1337;

app.get('/', (req, res) => {
    console.log("index");
    res.send("Index");
});
app.use('/authenticate', (req, res) => {
    console.log("POST");
    if (req.body.username != undefined && req.body.password != undefined && req.body.username != "" && req.body.password != "") {
        let mysql = require('mysql');
        let database_config = require('./modules/config/database');

        let connection = mysql.createConnection({
            host: database_config.host,
            user: database_config.username,
            password: database_config.password,
            database: database_config.database
        });

        connection.query('SELECT * FROM admin WHERE admin.USERNAME = ? AND admin.PASSWORD = ?', [req.body.username, req.body.password], function (error, results, fields) {
            if (error) throw error;
            if (results) {
                const payload = {
                    username: req.body.username
                };
                var token = jwt.sign(payload, app.get('secret'), {
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            }
        });
    }
    else {
        res.status(403)
        res.json({
            success: false,
            message: 'No token provided.'
        });
    }

});

app.use('/api', require('./modules/api'));

app.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.authToken || req.query.authToken || req.headers['Authentication'];

    let not_admin_methods = ["GET", "POST", "PUT", "DELETE"];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        if (not_admin_methods.find((element) => {
            if (req.method.toUpperCase() == element.toUpperCase())
                return 1;
            else
                return 0;
        })) {
            next();
        }
        else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }

    }
});

var server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
