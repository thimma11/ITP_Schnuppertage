'use strict';
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 1337;

app.get('/', (req, res) => {
    res.send("Index");
});

app.use('/api', require('./api/api'));

var server = http.createServer(app);
server.listen(port);
