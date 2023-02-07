const inquirer = require("inquirer")
const mysql = require('mysql2');
const cTable = require('console.table');
const express = require('express');
const { inherits } = require("util");
const { table } = require("console");
const { rawListeners, listenerCount } = require("process");

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
            "Update Employee Role",
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
  default:'1-3',
  name: 'manager_id',
  validate: function (answer) {
      if (answer == null || answer == 0) {
          return console.log("Invalid");
      }
      return true;
  }
}]

let newRole = [{
  type: 'input',
  message: "What is the role Title?",
  name: 'title',
  validate: function (answer) {
      if (answer.length < 1) {
          return console.log("Invalid");
      }
      return true;
  }
},
{
  type: 'input',
  message: "What is the role Salary?",
  name: 'salary',
  validate: function (answer) {
      if (answer.length < 1) {
          return console.log("Invalid");
      }
      return true;
  }
},
{
  type: 'input',
  message: "What is the role department_id?",
  name: 'department_id',
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
  if (choice.choice === 'Update Employee Role'){
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
      console.log('\nInvalid, check constraints\n');
      db.query(`DELETE FROM employee WHERE (first_name, last_name, role_id, manager_id) = ('${employee.first_name}', '${employee.last_name}', '${employee.role_id}', '${employee.manager_id}');`);
      addEmployee();
    } else {
      console.log(`\nEmployee Added!\n`);
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

async function addRole(){
  const role = await inquirer.prompt(newRole);
  db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.title}', '${role.salary}', '${role.department_id}');`,
  function(err, res) {
    if (err) {
      console.log('\nInvalid, check constraints\n');
      db.query(`DELETE FROM role WHERE (title, salary, department_id) = ('${role.title}', '${role.salary}', '${role.department_id}');`);
      addRole();
    } else {
      console.log(`\nRole Added!\n`);
      init();
    }
  });

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

async function addDepartment(){
  const question = {  
    type: 'input',
    message: "What is the name of the Department?",
    name: 'department',
    validate: function (answer) {
        if (answer == null || answer < 1) {
            return console.log("Invalid");
        }
        return true;
    }
  }

  const dept = await inquirer.prompt(question);
  db.query(`INSERT INTO department (id, name) VALUES (NULL, '${dept.department}');`),
  function(err, res) {
    if (err) {
      console.log('\nInvalid, check constraints\n');
      db.query(`DELETE FROM department WHERE (name) = ('${dept.department}');`);
      addDepartment();
    } 
  };

  console.log(`\nDepartment Added!\n`);

  init();
}

 async function updateEmployee(){
  db.query(`SELECT * FROM employee;`,
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      //use map method to filter thru employees
      const extractedData = res.map(employee => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          role_id: employee.role_id
        };
      });

      console.log(extractedData);
      inquirer.prompt([
        {
        type: 'list',
        name: 'employee',
        choices:function() {
          var Name = [];
          for (var i = 0; i < extractedData.length; i++) {
            Name.push(extractedData[i].name);
          }
          return Name;
        },
        message: 'What is the Employee name?'
        },
        {
        type: 'input',
        name: 'role',
        message: 'What is the new role id?'
        }])
        .then(val => {
        const fullName = val.employee;
        const nameArray = fullName.split(" ");
        const firstName = nameArray[0];
        const lastName = nameArray[1];
        const newID = val.role;
        
        db.query(`UPDATE employee SET role_id = ${newID} WHERE first_name = '${firstName}' AND last_name = '${lastName}';`,
        function(err, res) {
          if (err) {
            console.log(err);
          } else {
            console.table(`\nRole Updated!\n`);
            init();
          }
        });
      });
    }
  });
}









