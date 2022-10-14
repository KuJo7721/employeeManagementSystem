const inquirer = require('inquirer');
const mysql = require('mysql2');
const { mainModule } = require('process');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE
    },
    console.log(`Connected to the employee_db database.`)
  );

db.connect((err)=>{
    if(err) throw err;
    main();
});

function main(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do: ',
            choices: [
              'View Depts',
              'View Roles',
              'View Employees',
              'Add Dept',
              'Add Role',
              'Add Employee',
              'Update Employee',
              'Exit'
            ],
          }
    ]).then((answers)=>{
        if (answers.menu === 'View Depts') {
            viewDepartments();
        } 
        else if (answers.menu === 'View Roles'){
            viewRoles();
        }
        else if (answers.menu === 'View Employees'){
            viewEmployees();
        }
        else if (answers.menu === 'Add Dept'){
            addDept()
        }
        else if (answers.menu === 'Add Role'){
            addRole()
        }
        else if (answers.menu === 'Add Employee'){
            addEmployee()
        }
        else if (answers.menu === 'Update Employee'){
            
        }
        else{
            db.end();
        }
    })
}

function viewDepartments(){
    db.query('SELECT * FROM department', (err, results)=>{
        if(err) throw err;
        console.table(results);
        main();
    })
}
function viewRoles(){
    db.query('SELECT * FROM role', (err, results)=>{
        if(err) throw err;
        console.table(results);
        main();
    })
}
function viewEmployees(){
    db.query('SELECT * FROM employee', (err, results)=>{
        if(err) throw err;
        console.table(results);
        main();
    })
}

function addDept(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your department: ',
        }
    ]).then((answers)=>{
        db.query('INSERT INTO department SET ?', answers, (err, results)=>{
            if(err) throw err;
            console.table(results);
            main();
        })
    })
}
function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role: ',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for the role: (commas unnecessary) ',
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Which department?',
        }
    ]).then((answers)=>{
        db.query('INSERT INTO role SET ?', answers, (err, results)=>{
            if(err) throw err;
            console.table(results);
            main();
        })
    })
}
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name: ',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name: ',
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'what role?',
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'what manager?',
        },
    ]).then((answers)=>{
        db.query('INSERT INTO employee SET ?', answers, (err, results)=>{
            if(err) throw err;
            console.table(results);
            main();
        })
    })
}