const inquirer = require("inquirer")
const mysql = require('mysql2');
const cTable = require('console.table');
const express = require('express');
const { inherits } = require("util");
const { table } = require("console");

//homescreen with options. each choice will lead to it's function
let homescreen = [
  {
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: [
            "View All Employees",
            'Add Employee', 
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Update Employee",
          ]
  }
]

let newEmployee = [ {
  type: 'input',
  message: "What is the Employee first name?",
  name: 'first_name',
  validate: function (answer) {
      if (answer.length < 1) {
          return console.log("Invalid");
      }
      return true;
  }
},
{
  type: 'input',
  message: "What is the Employee last name?",
  name: 'last_name',
  validate: function (answer) {
      if (answer.length < 1) {
          return console.log("Invalid");
      }
      return true;
  }
},
{
  type: 'input',
  message: "What is the Employee role_id?",
  name: 'role_id',
  validate: function (answer) {
      if (answer == null || answer == 0) {
          return console.log("Invalid");
      }
      return true;
  }
},
{
  type: 'input',
  message: "What is the Employee manager id?",
  name: 'manager_id',
  validate: function (answer) {
      if (answer == null || answer == 0) {
          return console.log("Invalid");
      }
      return true;
  }
}]




// Connect to database
const db = mysql.createConnection(
  {
    //apple M1 chip shenanigans
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
  
);


init();

async function init(){

let choice = await inquirer.prompt(homescreen);

  if (choice.choice === 'View All Employees'){
    viewAllEmployees();
  }
  if (choice.choice === 'Add Employee'){
    addEmployee();
  }
  if (choice.choice === 'View All Roles'){
    viewAllRoles();
  }
  if (choice.choice === 'Add Role'){
    addRole();
  }
  if (choice.choice === 'View All Departments'){
    viewAllDepartments();
  }
  if (choice.choice === 'Add Department'){
    addDepartment();
  }
  if (choice.choice === 'Update Employee'){
    updateEmployee();
  }

}


function viewAllEmployees(){
  db.query(`SELECT employee.first_name AS First_Name,employee.last_name AS Last_Name,role.title AS Title,role.salary AS Salary,department.name AS Department, CONCAT(pikachu.first_name, ' ' ,pikachu.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee pikachu ON employee.manager_id = pikachu.id;`,
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.table(res);
      init();
    }
  });
}

async function addEmployee(){
  const employee = await inquirer.prompt(newEmployee);
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.first_name}', '${employee.last_name}', '${employee.role_id}', '${employee.manager_id}');`,
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Employee Added!`);
      init();
    }
  });
}

function viewAllRoles(){
  db.query(`SELECT * FROM role;`,
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.table(res);
      init();
    }

  });
}

function addRole(){

}

function viewAllDepartments(){
  db.query(`SELECT * FROM department;`,
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.table(res);
      init();
    }

  });

}

function addDepartment(){

}

function updateEmployee(){

}








// Query database example

// db.query(`DELETE FROM favorite_books WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

