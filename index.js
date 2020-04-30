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
                "Update Employee Role",
                "Update Employee Department",
                "Update Employee Role",
                "End Data Entry",
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

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee":
                    updateEmployee();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "Add Position":
                    addRole();

                case "Exit App":
                    connection.end();
                    console.log("End")
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
    var results = []
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
