const inquirer = require('inquirer');
//const cTable = require('console.table');
//const db = require('./db/connection');
var mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Shaggy307!',
  database: 'employeeTracker'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
  
  console.log(`
  ================
  EMPLOYEE TRACKER
  ================
  `)
  promptCategories();
});

const promptCategories = () => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'category',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ])
  .then(function (response) {
    switch (response.category) {
      case 'View all departments':
        viewDepartments();
        break;

      case 'View all roles':
        viewRoles();
        break;

      case 'View all employees':
        viewEmployees();
        break;

      case 'Add a department':
        addDepartment();
        break;

      case 'Add a role':
        addRole();
        break;

      case 'Add an employee':
        addEmployee();
        break;

      case 'Update an employee role':
        updateEmployeeRole();
        break;

      case 'Exit':
      process.exit(0);
    }
  })
};

function viewDepartments() {
  //router.get('/departments', (req, data) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, data) => {
      if (err) throw err;
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].name + ' | ' + data[i].id);
      }
      promptCategories();
    });
      
};

//promptCategories();