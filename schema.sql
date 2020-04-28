DROP DATABASE IF EXISTS employees;
CREATE database employees;

USE employees;

CREATE TABLE employee (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30),
last_name VARCHAR (30),
position_id INT,
manager_id INT,
depart_id INT
);
CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL
    AUTO_INCREMENT,
    dept_name VARCHAR (30) NULL
);
CREATE TABLE position (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR (30),
salary DECIMAL,
department_id VARCHAR (20)
);