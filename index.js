const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const promptCategories = () => {
  console.log(`
  ================
  EMPLOYEE TRACKER
  ================
  `)
  return inquirer
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
        'Update an employee role'
      ]
    }
  ])
};

promptCategories();