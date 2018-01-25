var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var database_config = require('../../config/database');

var connection = mysql.createConnection({
    host: database_config.host,
    user: database_config.username,
    password: database_config.password,
    database: database_config.database
});

router.get('/:id/events', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT events.ID, events.DATE, locations.NAME FROM events JOIN locations ON locations.ID = events.LOCATIONS_ID WHERE events.DEPARTMENTS_ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.post('/:id/events', (req, res) => {
    let id = req.params.id; 
    connection.query(`INSERT INTO events (events.DATE, events.DEPARTMENTS_ID, events.LOCATIONS_ID) VALUES (?, ?, ?);`, [req.body.date, id, req.body.location_id],function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:id/locations', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT locations.ID, locations.NAME FROM locations 
	                JOIN timetables ON timetables.LOCATIONS_ID = locations.ID 
	                JOIN departments ON timetables.DEPARTMENTS_ID = departments.ID
                    WHERE departments.ID = ?;`, [id], function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
});
<<<<<<< HEAD
router.post('/:id/locations', (req, res) => {
    let id = req.params.id;
    connection.query(`INSERT INTO timetables (timetables.DEPARTMENTS_ID, timetables.LOCATIONS_ID) VALUES (?, ?);`, [req.body.location_id, id], function (error, results, fields) {
        if (error) throw error;
        connection.query(`INSERT INTO groups(groups.LOCATION_ID, groups.DEPARTMENT_ID) VALUES (?, ?);`, [req.body.location_id, id], function (error, results, fields) {
            if (error) throw error;
            let daytable_id = results[0]["insertId"];
            connection.query(`INSERT INTO daytables (daytables.DAY_NAME, daytables.GROUPS_ID) VALUES ('MO', ?), ('DI', ?), ('MI', ?), ('DO', ?), ('FR', ?);`, [daytable_id], function (error, results, fields) {
                if (error) throw error;

            });
        });
    });
});
=======
>>>>>>> de269a4ddb56e639a72b9dfd3ae6eb7d77ca1316
router.get('/:id/!locations', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT locations.ID, locations.NAME FROM locations 
	                JOIN timetables ON timetables.LOCATIONS_ID = locations.ID 
	                JOIN departments ON timetables.DEPARTMENTS_ID = departments.ID
	                WHERE locations.ID NOT IN (SELECT locations.ID FROM locations 
								JOIN timetables ON timetables.LOCATIONS_ID = locations.ID 
								JOIN departments ON timetables.DEPARTMENTS_ID = departments.ID
                        		WHERE departments.ID = ?);`, [id], function (error, results, fields) {
        if (error) console.log(error);
            res.json(results);
    });
});

router.get('/:id/timetables', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT COUNT(groups.ID) FROM groups JOIN timetables ON groups.TIMETABLES_ID = timetables.ID JOIN locations ON timetables.LOCATIONS_ID = locations.ID JOIN departments ON departments.ID = timetables.DEPARTMENTS_ID WHERE departments.ID = ? AND locations.ID = ?;`, [id, req.params.location_id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/', (req, res) => {
    connection.query(`SELECT d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d;`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO departments (departments.NAME, departments.CONTRACTION) VALUES ('${req.body.name}', '${req.body.contraction}');`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
        res.end();
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d WHERE d.ID = ${id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});
router.put('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`UPDATE d.ID AS id, d.Contraction AS contraction, d.Name AS name from departments d WHERE d.ID = ${id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});
router.delete('/:id', (req, res) => {
    connection.query(`DELETE from departments WHERE ID = ${req.params.id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});




module.exports = router;