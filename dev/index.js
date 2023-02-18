const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');

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


const newEmpdata = [];

async function makeEmp() {

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
       
        db.query('SELECT * FROM employee', function (err, results) {
            console.log(results);
            addMore();
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
        return makeEmp()
    }
};
async function newEmp() {
    const [employee] = await db.promise().query('SELECT * FROM employee')
    console.log(employee);
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
            type: 'input',
            message: 'Who is your Manager?',
            name: 'manager'
        },
    ])
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?)', [addNew.firstName, addNew.lastName, addNew.manager], function (err, results) {
        console.log(results);
        addMore();
    });

}


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
        console.log(results);
        addMore();
    });
}



makeEmp();

//     .then((Response) => {
//     writeToFile('index.html', response);
//     console.log('Thanks for Your information')
//     console.log('response list', response)
// });

function writeToFile(response) {
    fs.writeFile('index.html', genTeam(response), (err) =>
        err ? console.error(err) : console.log('add log'))
}