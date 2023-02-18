const fs = require('fs');
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');


// create connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Ibetshetuckslol',
        database: 'emp_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const app = express()
const newEmpdata = [];

async function initialize() {

    const response = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do? (use arrow keys',
                name: 'options',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Quit'],
            },
        ])

    if (response.options === 'View All Employees') {

        db.query('SELECT first_name, last_name, role_id, manager_id FROM employee', function (err, results) {
            
            console.table(results)

        });
        initialize();
    } 

    if (response.options === 'View All Roles') {

        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);

        });
    }

    if (response.options === 'View All Departments') {

        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);

        });
    }

    if (response.options === 'Add Role') {
        addRole();
    }

    if (response.options === 'Add Employee') {
        newEmp();
    }

    if (response.options === 'Update Employee Role') {
        updateRole();
    }
    if (response.options === 'Quit')
        process.exit(0);
};
initialize();

async function updateRole() {
    const [departments] = await db.promise().query('SELECT id AS value, department_name AS name FROM department')
    const [employee] = await db.promise().query('SELECT first_name AS name, id AS value FROM employee')
    const roleUpdate = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'What is the employee name?',
                name: 'updatedRole',
                choices: employee
            }, 
            {
                type: 'input',
                message: 'Add Employee Role',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the employee salary?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is the department id?',
                name: 'deptID',
                choices: departments
            },
            
        ])
        // but why its 3 values?
        db.query('INSERT INTO role VALUES (id, title, department_id, salary)', [roleUpdate.title, roleUpdate.salary, roleUpdate.deptID], function (err, results) {
        if (err) throw err;
        console.table(results);
        initialize();
        
    });
    
};


async function addMore() {
    const addNewEmp = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'What Would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Quit'],
                name: 'add'
            }
        ])

    if (addNewEmp.add === 'Add Employee') {
        return initialize()
    }
};

async function newEmp() {
    const [employees] = await db.promise().query('SELECT first_name AS value FROM employee')
    console.log(employees);
    const addNew = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'First Name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'Last Name?',
                name: 'lastName'
            },
            {
                type: 'list',
                message: 'Who is your Manager?',
                name: 'manname',
                choices: employees
            },
        ])
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [addNew.firstName, addNew.lastName, addNew.manname], function (err, results) {
        console.table(results);
        
    });
    initialize();

};


//
async function addRole() {
    const [departments] = await db.promise().query('SELECT id AS value, department_name AS name FROM department')
    console.log(departments);
    const addRoleEmp = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Add Employee Role',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the employee salary?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is the department id?',
                name: 'deptID',
                choices: departments
            },

        ])
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [addRoleEmp.title, addRoleEmp.salary, addRoleEmp.deptID], function (err, results) {
        console.table(results);
        initialize();
    });
};





//     .then((Response) => {
//     writeToFile('index.html', response);
//     console.log('Thanks for Your information')
//     console.log('response list', response)
// });

function writeToFile(response) {
    fs.writeFile('index.html', genTeam(response), (err) =>
        err ? console.error(err) : console.log('add log'))
};