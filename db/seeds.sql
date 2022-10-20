INSERT INTO department(name)
VALUES ('Management'),
    ('Engineering'),
    ('HR');

INSERT INTO role(title, salary, department_id)
VALUES ('Manager', 80000, 1),
    ('Engineer', 120000, 2),
    ('HR', 90000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Ashley', 'Brown', 3, NULL);