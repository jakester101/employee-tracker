const inquirer = require("inquirer")
const mysql = require('mysql2');
const tableGen = require('console.table');
const express = require('express');
const { inherits } = require("util");

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

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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
  console.log('hey mom');
  init();
}

function addEmployee(){

}

function viewAllRoles(){

}

function addRole(){

}

function viewAllDepartments(){

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

