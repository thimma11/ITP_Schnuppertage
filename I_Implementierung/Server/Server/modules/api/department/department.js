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
    connection.query(`SELECT events.ID, DATE_FORMAT(events.DATE,\'%Y-%m-%d\') as DATE, locations.NAME FROM events JOIN locations ON locations.ID = events.LOCATIONS_ID WHERE events.DEPARTMENTS_ID = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});
router.post('/:id/events', (req, res) => {
    let id = req.params.id; 
    connection.query(`INSERT INTO events (events.DATE, events.DEPARTMENTS_ID, events.LOCATIONS_ID) VALUES (?, ?, ?);`, [req.body.date, id, req.body.location_id], function (error, results, fields) {
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
router.get('/:id/all_locations', (req, res) => {
    let department_id = req.params.id;
    let is_dep = false;
    let id = "";
    let name = "";
    arr = []
    connection.query(`SELECT id, name from locations;`, function (error, results, fields) {
        let locations = results;
        connection.query(`SELECT departments_id as dep_id, locations_id as loc_id from timetables;`, function (error, timetables, fields) {
            for (let i = 0; i < locations.length; i++) {
                id = locations[i]['id']
                name = locations[i]['name']
                for (let j = 0; j < timetables.length; j++) {
                    let dep_id = timetables[j]['dep_id']
                    let loc_id = timetables[j]['loc_id']
                    
                    if (loc_id == id && dep_id == department_id) {
                        is_dep = true;
                        break;
                    }
                    else {
                        is_dep = false;
                    }
                }
                
                arr.push({id: id, name: name, in_dep: is_dep});                
            }

            if (error) throw error;
            res.json(arr);
        });
    });
});

router.post('/:id/locations', (req, res) => {
    let id = req.params.id;
    var connection2 = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    var connection3 = mysql.createConnection({
        host: database_config.host,
        user: database_config.username,
        password: database_config.password,
        database: database_config.database
    });
    connection.query(`INSERT INTO timetables (timetables.DEPARTMENTS_ID, timetables.LOCATIONS_ID) VALUES (?, ?);`, [id, req.body.location_id], function (error, results, fields) {
        if (error) throw error;
        connection2.query(`INSERT INTO groups(groups.LOCATION_ID, groups.DEPARTMENT_ID) VALUES (?, ?);`, [req.body.location_id, id], function (error, results, fields) {
            if (error) throw error;
            let daytable_id = results["insertId"];
            connection3.query(`INSERT INTO daytables (daytables.DAY_NAME, daytables.GROUPS_ID) VALUES ('Montag', ?), ('Dienstag', ?), ('Mittwoch', ?), ('Donnerstag', ?), ('Freitag', ?);`, [daytable_id, daytable_id, daytable_id, daytable_id, daytable_id], function (error, results, fields) {
                if (error) throw error;
                res.json(results);
            });
        });
    });
});
router.get('/:id/!locations', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT locations.ID, locations.NAME FROM locations 
	                WHERE locations.ID NOT IN (SELECT locations.ID FROM locations 
								JOIN timetables ON timetables.LOCATIONS_ID = locations.ID 
								JOIN departments ON timetables.DEPARTMENTS_ID = departments.ID
                        		WHERE departments.ID = ?);`, [id], function (error, results, fields) {
        if (error) console.log(error);
            res.json(results);
    });
});

router.delete('/:id/locations/:location_id', (req, res) => {
    let id = req.params.id;
    let location_id = req.params.location_id;
    //zuerst alle Gruppen für den timetable finden
    connection.query('DELETE FROM TIMETABLES WHERE TIMETABLES.DEPARTMENTS_ID = ? AND TIMETABLES.LOCATIONS_ID = ?', [id, location_id], (error, results, fields) => {
        if (error) console.log(error);
        res.json("success");
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
    console.log("before connection");
    connection.connect();
    console.log("after connection");
    connection.query('SELECT ID as id, Contraction as contraction, Name as name from departments;', function (error, results, fields) {
        console.log("inside");
        if (error) console.log(error);
        console.log(results);
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
    connection.query(`UPDATE departments set contraction=?, name=? WHERE id = ${id};`, [req.body.contraction, req.body.name], function (error, results, fields) {
        if (error) console.log(error);
        res.json(results);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM DEPARTMENTS WHERE DEPARTMENTS.ID = ?', [id], (error, results, fields) => {
        if (error) console.log(error);
        res.json("success");
    });
});




module.exports = router;