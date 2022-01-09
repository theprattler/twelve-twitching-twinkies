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
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].name + ' | ' + data[i].id);
      
    }
    console.log(`
      
      =====================================

    `);
    promptCategories();
  });
};

function viewRoles() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].title + ' | ' + data[i].id + ' | ' + data[i].department_id + ' | ' + data[i].salary);
    }
    console.log(`
      
      =====================================

    `);
    promptCategories();
  });
};

function viewEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].id + ' | ' + data[i].first_name + ' | ' + data[i].last_name + ' | ' + data[i].role_id + ' | ' + data[i].manager_id);
    }
    console.log(`
      
      =====================================

    `);
    promptCategories();
  });
};

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department?'
    }
  ])
  .then(function (answer) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, answer.departmentName, (err, result) => {
      if (err) throw err;
      console.log(answer.departmentName + " has been added");
      console.log(`
      
        =====================================

      `);
      promptCategories();
    })
  });
};

function addRole () {
  const sql = `SELECT * FROM department`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of this role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does this role belong to?',
        choices: function () {
          let updateDepartments = [];
          for (var i = 0; i < data.length; i++) {
            updateDepartments.push(data[i].name)
          }
          return updateDepartments;
        }
      }
    ])
  });
};

//function addEmployee() {}

//function updateEmployeeRole() {}