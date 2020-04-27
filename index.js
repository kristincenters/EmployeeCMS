require('dotenv').config()
const inquirer = require('inquirer');
const mysql = require('mysql');
const ConsoleTable = require('console.table');

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
            message: "View Options?",
            choices: [
                "View All Employees",
                "View Employees by Role",
                "View Employees by Department",
                "Add New Employee",
                "Add Role to Employee",
                "Add Department to Employee",
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
        employeeViewAll();
    });
}