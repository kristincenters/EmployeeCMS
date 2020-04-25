USE employees;

INSERT INTO department
    (name)
VALUES
    ('Accounts'),
    ('Creative'),
    ('Media'),
    ('Finance');
    
    INSERT INTO `role`
    (title, salary, department_id)
VALUES
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

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Leslie', 'Smith', 1, 2),
    ('John', 'Down', 3, 4),
    ('Mary', 'Jones', 4, 5),
    ('Tom', 'Hall', 4, 3),
    ('Lynn', 'Bell', 1, 4),
    ('Matt', 'Brown', 4, 4),
    ('Ann', 'Martin', 3, 4),
    ('Julie', 'Collins', 3, 2),
    ('Donna', 'Green', 2, 3),
    ('Bill', 'Moon', 4, 1),
    ('Troy', 'Andrews', 1, 4),
    ('Tim', 'Meyers', 3, 2);