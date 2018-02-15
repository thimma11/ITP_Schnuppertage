var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('../config/database');
var nodemailer = require('nodemailer'); 

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});

var nodemailer = require('nodemailer');

var email = 'youremail@gmail.com';
var server_url = 'http://localhost:1337/api/confirm_registration/'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: 'yourpassword'
  }
});

router.get('/', (req, res) => {
// mail test:
var mailOptions = {
    from: email,
    to: 'tomhimmer@gmail.com',
    subject: 'Teilnahme an Schnuppertag bestätigen',
    text: 'Um die Teilnahme am ausgewählten Schnuppertag zu bestätigen, klicken Sie auf folgenden Linl: \n' + server_url + results.insertId
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
});

router.post('/', (req, res) => {
    connection.query('SELECT id FROM events WHERE date=? and departments_id=? and locations_id=?;', [req.body.date, req.body.department_id, req.body.location_id], function (error, results, fields) {
        if (error) console.log(error);

        connection.query(`INSERT INTO participants (firstname, lastname, phone, email, school_location, school_typ, events_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.school_location, req.body.school_typ, results[0].id], function (error, results, fields) {
            if (error) console.log(error);

            var mailOptions = {
                from: email,
                to: req.body.email,
                subject: 'Teilnahme an Schnuppertag bestätigen',
                text: 'Um die Teilnahme am ausgewählten Schnuppertag zu bestätigen, klicken Sie auf folgenden Linl: \n' + server_url + results.insertId
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              }); 

            res.json(results);
        });
    });
});

router.get('/events/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT * from participants p WHERE p.events_id = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM participants WHERE id = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = router;