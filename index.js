const inquirer = require('inquirer');
const cTable = require('console.table');
var mysql = require('mysql2');

// database connection
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

// main menu
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
      // EXITS the database
      console.log('Goodbye');
      process.exit(0);
    }
  })
};

// VIEW all departments
function viewDepartments() {
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptCategories();
  });
};

// VIEW all roles
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

// VIEW all employees
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

// ADD a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the NAME of the new department?'
    }
  ])
  .then(function (answer) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, answer.departmentName, (err, result) => {
      if (err) throw err;
      console.log(answer.departmentName + ' has been added');
      promptCategories();
    })
  });
};

// ADD a role
function addRole () {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the NAME of this role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the SALARY for this role?'
    }
  ])
  .then(function (answer) {
    const sqlRole = `SELECT name, id FROM department`;
    const params = [answer.name, answer.salary];
    db.query(sqlRole, (err, data) => {
      if (err) throw err;
      
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'department',
          message: 'In which DEPARTMENT will this role be?',
          choices: dept
        }
      ])
      .then(deptSelection => {
        const dept = deptSelection.department;
        params.push(dept);

        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log(answer.name + ' has been added');
          promptCategories();
        })
      });
    });
  });
};

// ADD an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is this employee's FIRST name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is this employee's LAST name?"
    }
  ])
  .then(answer => {
    const sqlRole = `SELECT role.id, role.title FROM role`;
    const params = [answer.firstName, answer.lastName];
    db.query(sqlRole, (err, data) => {
      if (err) throw err;

      const roles = data.map(({ id, title }) => ({ name: title, value: id }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: "What is this employee's ROLE?",
          choices: roles
        }
      ])
      .then(roleSelection => {
        const role = roleSelection.role;
        params.push(role);

        const sqlManager = `SELECT * FROM employee`;
        db.query(sqlManager, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id}));
          inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: "Who is this employee's manager?",
              choices: managers
            }
          ])
          .then(managerSelection => {
            const manager = managerSelection.manager;
            params.push(manager);

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log(answer.firstName + ' ' + answer.lastName + ' has been added');
              promptCategories();
            })
          })
        })
      })
    })
  })
};

// UPDATE an employee's role
function updateEmployeeRole() {
  const sqlEmployee = `SELECT * FROM employee`;
  db.query(sqlEmployee, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which EMPLOYEE will you update?',
        choices: employees
      }
    ])
    .then(employeeSelection => {
      const employee = employeeSelection.employee;
      const params = [];
      params.push(employee);
      
      const sqlRole = `SELECT * FROM role`;
      db.query(sqlRole, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: 'Which ROLE will this employee now have?',
            choices: roles
          }
        ])
        .then(roleSelection => {
          const role = roleSelection.role;
          params.push(role);

          let employee = params[0]
          params[0] = role
          params[1] = employee

          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          db.query(sql, params, (err, result) => {
            if (err) throw err;
            
            console.log("The employee's role has been updated");
            promptCategories();
          })
        })
      })
    })
  })
};