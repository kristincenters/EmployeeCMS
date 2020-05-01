require('dotenv').config()
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASS,
    database: "employees"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startApp();
});
function startApp() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Choose task:",
            choices: [
                "View All Employees",
                "View Employees by Position",
                "View Employees by Department",
                "Add New Employee",
                "Add Position",
                "Add Department",
                "Update Employee Role",
                "Exit App",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    employeeViewAll();
                    break;

                case "View Employees by Position":
                    employeeViewRole();
                    break;

                case "View Employees by Department":
                    employeeViewDept();
                    break;

                case "Add New Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "Add Position":
                    addRole();
                    break;

                case "Exit App":
                    connection.end();
                    console.log("End")
                    break;
                default:
                    break;
            }
        });
}
function employeeViewAll() {
    console.log("View all Employees");
    connection.query("SELECT first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN (department, position) ON (department.id = employee.depart_id AND position.id = employee.id)", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp()
    });
}
function employeeViewDept() {
    inquirer
        .prompt({
            name: "views",
            type: "list",
            message: "View by Department",
            choices: ["Accounts", "Creative", "Media", "Finance"]
        })
        .then(function (answer) {
            if (answer.views === "Media") {
                viewDeptMedia();
            }
            else if (answer.views === "Creative") {
                viewDeptCreative();
            }
            else if (answer.views === "Accounts") {
                viewDeptAccounts();
            }
            else if (answer.views === "Finance") {
                viewDeptFinance();
            } else {
                return;
            }
        });
}
function viewDeptMedia() {
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=3", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewDeptCreative() {
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=2", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewDeptAccounts() {
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=1", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewDeptFinance() {
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=4", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function employeeViewRole() {
    var choiceArray = []
    connection.query("SELECT * FROM position", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            choiceArray.push(data[i].title);
        }
        //console.log(choiceArray)
        inquirer
            .prompt([
                {
                    name: "chooseRole",
                    type: "list",
                    choices: choiceArray,
                    message: "Select Position to View",
                }
            ])
            .then(function (answer) {
                var selection = answer.chooseRole;
                connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE title=?", [selection], function (err, res, fields) {
                    if (err) throw err;
                    startApp();
                    console.table(res);
                });
            })
    })
}
function addEmployee() {
    var positionArray = []
    console.log(positionArray);
    connection.query("SELECT * FROM position", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            positionArray.push(data[i].title);
        }
        inquirer
            .prompt([
                {
                    name: "firstname",
                    type: "input",
                    message: "Enter Employee's First Name",
                },
                {
                    name: "lastname",
                    type: "input",
                    message: "Select Position to View",
                },
                {
                    name: "chooseRole",
                    type: "list",
                    choices: positionArray,
                    message: "Select Position",
                }
            ])
            .then(function (answer) {
                connection.query("INSERT INTO employees SET ?",
                    {
                        first_name: answer.firstname,
                        last_name: answer.lastname,
                        title: answer.title
                    }
                )
            })
            .then(function (answer) {
                var selection = answer.chooseRole;
                connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE title=?", [selection], function (err, res, fields) {
                    if (err) throw err;
                    startApp();
                    console.table(res);
                });
            })
    })
}
function addDept() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "New Department Title:"
            },
        ])
            .then(function (answer) {
                connection.query("INSERT INTO department SET ?",
                    { dept_name: answer.department },
                    function (err, res, fields) {
                        if (err) throw err;
                        startApp();
                        console.log("Department Added");
                    })
            })
    })
}
function addRole() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "position",
                type: "input",
                message: "New Position Title:"
            },
        ])
            .then(function (answer) {
                connection.query("INSERT INTO position SET ?",
                    { title: answer.position, },
                    function (err, res, fields) {
                        if (err) throw err;
                        startApp();
                        console.log("Position Added");
                    })
            })
    })
}

