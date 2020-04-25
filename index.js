require('dotenv').config()
const Inquirer = require('inquirer');
const mysql = require('mysql');
const ConsoleTable = require('console.table');

var connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});