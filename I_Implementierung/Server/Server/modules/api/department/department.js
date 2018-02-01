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
    connection.query('SELECT GROUPS.ID FROM GROUPS WHERE GROUPS.DEPARTMENT_ID = ? AND GROUPS.LOCATION_ID = ?', [id, location_id], (error, results, fields) => {
        if (error) console.log(error);
        results.forEach((group_item) => {
            if (typeof group_item != 'undefined')
                connection.query('SELECT DAYTABLES.ID FROM DAYTABLES WHERE DAYTABLES.GROUPS_ID = ?', [group_item.ID], (error, results, fields) => {
                    if (error) console.log(error);
                    results.forEach((daytable_item) => {
                        if (typeof daytable_item != 'undefined')
                            connection.query('DELETE FROM LESSONS WHERE LESSONS.DAYTABLES_ID = ?', [daytable_item.ID], (error, results, fields) => {
                                if (error) console.log(error);
                            });
                    });
                    connection.query('DELETE FROM DAYTABLES WHERE DAYTABLES.GROUPS_ID = ?', [group_item.ID], (error, results, fields) => {
                        if (error) console.log(error);
                    });
                });
        });
        connection.query('DELETE FROM GROUPS WHERE GROUPS.DEPARTMENT_ID = ? AND GROUPS.LOCATION_ID = ?', [id, location_id], (error, results, fields) => {
            if (error) console.log(error);
            connection.query('DELETE FROM TIMETABLES WHERE TIMETABLES.DEPARTMENTS_ID = ? AND TIMETABLES.LOCATIONS_ID = ?', [id, location_id], (error, results, fields) => {
                if (error) console.log(error);
            });
        });
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