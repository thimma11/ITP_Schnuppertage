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

router.get('/:id/daytables', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT daytables.ID, daytables.DAY_NAME FROM groups JOIN daytables ON groups.ID = daytables.GROUPS_ID WHERE groups.ID = ?;', [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/:dep_id/:loc_id', (req, res) => {
    let dep_id = req.params.dep_id;
    let loc_id = req.params.loc_id;
    if(req.query.count == 'true') {
        connection.query(`select count(g.id) as count from timetables t join groups g on t.departments_id=g.department_id and t.locations_id=g.location_id where t.departments_id=? and t.locations_id=? group by g.department_id, g.location_id;`, [dep_id, loc_id], function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }
    else {
        arr = []
        connection.query(`select g.id from timetables t join groups g on t.departments_id=g.department_id and t.locations_id=g.location_id where t.departments_id=? and t.locations_id=?;`, [dep_id, loc_id], function (error, results, fields) {
            if (error) throw error;

            for (let index = 0; index < results.length; index++) {
                arr.push(results[index]['id']);
            }
            res.json(arr);
        });
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM groups WHERE id = ${id};`, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    connection.query(`INSERT INTO groups(department_id, location_id) VALUES(?, ?);`, [req.body.department_id, req.body.location_id], function (error, results, fields) {
        if (error) throw error;

        days.forEach(item => {
            connection.query(`INSERT INTO daytables(day_name, groups_id) VALUES(?, ?);`, [item, results.insertId], function (error, results, fields) {
                if (error) throw error;
            });
        });

        res.json(results);
    });
});

module.exports = router;