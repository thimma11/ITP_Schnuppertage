'use strict';
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 1337;

app.get('/', (req, res) => {
    console.log("index");
    res.send("Index");
});

app.use('/api', require('./modules/api'));

var server = http.createServer(app);
server.listen(port);
