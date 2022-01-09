const inquirer = require('inquirer');
const cTable = require('console.table');
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
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    /*console.log(`
      =====================================
    `);*/
    promptCategories();
  });
};

function viewRoles() {
  const sql = `SELECT role.id,
                      role.title,
                      department.name AS department
              FROM role
              INNER JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptCategories();
  });
};

function viewEmployees() {
  const sql = `SELECT employee.id,
                      employee.first_name,
                      employee.last_name,
                      role.title,
                      department.name AS department,
                      role.salary,
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
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
}


//function addEmployee() {}

//function updateEmployeeRole() {}