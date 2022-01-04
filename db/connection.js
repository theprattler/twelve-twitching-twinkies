const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shaggy307!',
  database: 'employeeTracker'
});

module.exports = db;