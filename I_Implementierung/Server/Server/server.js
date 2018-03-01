'use strict';
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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



app.use('/api', require('./modules/api'));

var server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
