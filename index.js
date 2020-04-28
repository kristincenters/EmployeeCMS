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
            type: "rawlist",
            message: "Choose task:",
            choices: [
                "View All Employees",
                "View Employees by Role",
                "View Employees by Department",
                "Add New Employee",
                "Update Employee Role",
                "Update Employee Department",
                "Update Employee Role",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    employeeViewAll();
                    break;

                case "View Employees by Role":
                    employeeViewRole();
                    break;

                case "View Employees by Department":
                    employeeViewDept();
                    break;

                case "Add New Employee":
                    employeeAdd();
                    break;

                case "Add Role to Employee":
                    employeeAddRole();
                    break;

                case "Add Department to Employee":
                    employeeAddDept();
                    break;

                case "Update Employee Role":
                    employeeUpdateRole();

                case "End Data Entry":
                    connection.end();
                    console.log("Finished!")
                    endApp();
                    break;
                default:
                    break;
            }
        })
}
function employeeViewAll() {
    console.log("View all Employees\n");
    connection.query("SELECT first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN (department, position) ON (department.id = employee.depart_id AND position.id = employee.id)", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
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
                connection.end();
            }
        });
}
function viewDeptMedia() {
    console.log();
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=3", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewDeptCreative() {
    console.log();
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=2", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewDeptAccounts() {
    console.log();
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=1", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
function viewDeptFinance() {
    console.log();
    connection.query("SELECT employee.id, first_name, last_name, title, dept_name, salary FROM employee LEFT JOIN(department, position) ON (department.id = employee.depart_id) AND position.id = employee.id WHERE employee.depart_id=4", function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}