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
                choices: ['View All Employees', 'Add Employee', 'add Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Quit'],
            },
        ])

    if (response.options === 'View All Employees') {
        // const viewEmp = await inquirer
        //     .prompt([
        //         {
        //             type: 'input',
        //             message: 'what is your office number?',
        //             name: 'onumber',
        //         },
        //     ])

        db.query('SELECT * FROM employee', function (err, results) {
            console.log(results);
            addMore();
        });
    } 

    if (response.options === 'add Employee Role') {
        addRole();
    }

};

async function addMore() {
    const addNewEmp = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Add another employee or return to menu',
                choices: ['Add another', 'return to menu'],
                name: 'add'
            }
        ])
    if (addNewEmp.add === 'Add another') {
        return makeEmp()
    }
    process.exit(0);
}
//
async function addRole() { 
    const [departments] = await db.promise().query('SELECT * FROM department')
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


function createTeam() {
    writeToFile(newEmpdata);
    console.log(newEmpdata);
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