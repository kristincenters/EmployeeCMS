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
INSERT INTO department (dept_name)
VALUES
    ('Accounts'),
    ('Creative'),
    ('Media'),
    ('Finance');
    
INSERT INTO position (title, salary, department_id)
VALUES
    ('CEO', 125000, 1),
    ('Account Executive', 100000, 1),
    ('Jr Account Executive', 75000, 1),
    ('Creative Director', 125000, 2),
    ('Designer', 80000, 2),
    ('Copy Writer', 70000, 2),
    ('Media Director', 90000, 3),
    ('Media Buyer', 75000, 3),
    ('Finance Director', 85000, 4),
    ('Accountant', 60000, 4),
    ('Clerk', 50000, 4);

INSERT INTO employee (first_name, last_name, position_id, manager_id, depart_id)
VALUES
    ('Leslie', 'Smith', 1, 1, 1),
    ('John', 'Down', 2, 1, 1),
    ('Mary', 'Jones', 3, 2, 1),
    ('Tom', 'Hall', 4, 1, 2),
    ('Lynn', 'Bell', 5, 4, 2),
    ('Matt', 'Brown', 6, 4, 2),
    ('Ann', 'Martin', 7, 1, 3),
    ('Julie', 'Collins', 8, 7, 3),
    ('Donna', 'Green', 9, 1, 4),
    ('Bill', 'Moon', 10, 9, 4),
    ('Troy', 'Andrews', 11, 9, 4);