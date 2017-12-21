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
app.get('/api', (request, response) => {
    console.log("api");
    response.send("hallo welt");
});

app.listen(port);
